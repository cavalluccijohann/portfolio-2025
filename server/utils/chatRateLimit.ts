import { Redis } from '@upstash/redis'
import { createClient, type RedisClientType } from 'redis'
import type { H3Event } from 'h3'
import { getRequestIP } from 'h3'

const KEY_TTL_SECONDS = 60 * 60 * 72

const DEFAULT_GLOBAL_PER_DAY = 100
const DEFAULT_IP_PER_DAY = 10

/** Common abstraction for Upstash REST. */
type ChatRedisStore = {
  incr(key: string): Promise<number>
  decr(key: string): Promise<number>
  expire(key: string, seconds: number): Promise<unknown>
}

let upstashSingleton: Redis | null = null
let tcpClient: RedisClientType | null = null

function getUpstashStore(): ChatRedisStore | null {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim()
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim()
  if (!url || !token || !url.startsWith('https://')) return null
  if (!upstashSingleton) upstashSingleton = new Redis({ url, token })
  return upstashSingleton
}

function resolveTcpRedisUrl(): string | null {
  const direct = process.env.REDIS_URL?.trim()
  if (direct) return direct

  const host = process.env.REDIS_HOST?.trim()
  const password = process.env.REDIS_PASSWORD?.trim()
  if (!host || !password) return null

  const user = process.env.REDIS_USERNAME?.trim() || 'default'
  const port = process.env.REDIS_PORT?.trim() || '6379'
  return `rediss://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}`
}

function wrapTcp(c: RedisClientType): ChatRedisStore {
  return {
    incr: (k) => c.incr(k),
    decr: (k) => c.decr(k),
    expire: (k, s) => c.expire(k, s),
  }
}

async function getStore(): Promise<ChatRedisStore | null> {
  const upstash = getUpstashStore()
  if (upstash) return upstash

  const tcp = await getTcpClient()
  return tcp ? wrapTcp(tcp) : null
}

async function requireStore(): Promise<ChatRedisStore> {
  const redis = await getStore()
  if (redis) return redis

  const rawUpstash = process.env.UPSTASH_REDIS_REST_URL?.trim()
  const hasBadUpstash = Boolean(rawUpstash && !rawUpstash.startsWith('https://'))
  console.error(
    hasBadUpstash
      ? '[rate-limit] UPSTASH_REDIS_REST_URL doit être https:// — blocage fail-closed'
      : '[rate-limit] Aucun Redis configuré — blocage fail-closed',
  )
  throw createError({
    statusCode: 503,
    statusMessage: 'Service temporarily unavailable. Please try again later.',
  })
}

async function enforceDailyLimits(opts: {
  event: H3Event
  prefix: string
  globalLimit: number
  ipLimit: number
  label: string
}) {
  const redis = await requireStore()
  const ip = getRequestIP(opts.event, { xForwardedFor: true }) ?? 'unknown'
  const day = utcDayKey()
  const globalKey = `${opts.prefix}:ratelimit:global:${day}`
  const ipKey = `${opts.prefix}:ratelimit:ip:${ip}:${day}`
  const trusted = isTrustedIp(ip)

  let globalCount: number
  try {
    globalCount = await redis.incr(globalKey)
    if (globalCount === 1) await redis.expire(globalKey, KEY_TTL_SECONDS)
  } catch (err) {
    console.error(`[${opts.label}] Redis unreachable — blocking (fail-closed):`, err)
    throw createError({
      statusCode: 503,
      statusMessage: 'Service temporarily unavailable. Please try again later.',
    })
  }

  if (globalCount > opts.globalLimit) {
    await redis.decr(globalKey).catch(() => {})
    throw createError({
      statusCode: 429,
      statusMessage: 'Daily limit reached. Try again tomorrow.',
    })
  }

  if (!trusted) {
    let ipCount: number
    try {
      ipCount = await redis.incr(ipKey)
      if (ipCount === 1) await redis.expire(ipKey, KEY_TTL_SECONDS)
    } catch (err) {
      console.error(`[${opts.label}] Redis unreachable — blocking (fail-closed):`, err)
      await redis.decr(globalKey).catch(() => {})
      throw createError({
        statusCode: 503,
        statusMessage: 'Service temporarily unavailable. Please try again later.',
      })
    }
    if (ipCount > opts.ipLimit) {
      await redis.decr(ipKey).catch(() => {})
      await redis.decr(globalKey).catch(() => {})
      throw createError({
        statusCode: 429,
        statusMessage: 'Daily limit reached for this connection. Try again tomorrow.',
      })
    }
    console.log(
      `[${opts.label}] OK | ${day} | site ${globalCount}/${opts.globalLimit} | ip ${ipCount}/${opts.ipLimit} | ip=${ip}`,
    )
  } else {
    console.log(
      `[${opts.label}] OK | ${day} | site ${globalCount}/${opts.globalLimit} | IP trusted | ip=${ip}`,
    )
  }
}

/** Use Redis to prevent Upstash Free from being evicted (inactivity ~14 days). */
export async function pingChatRedis(): Promise<void> {
  const redis = await getStore()
  if (!redis) {
    throw new Error('No Redis configured (UPSTASH_* or REDIS_*)')
  }
  const key = 'chat:keepalive'
  await redis.incr(key)
  await redis.expire(key, 60 * 60 * 24 * 30)
}

async function getTcpClient(): Promise<RedisClientType | null> {
  const url = resolveTcpRedisUrl()
  if (!url) return null
  if (tcpClient?.isOpen) return tcpClient
  const client = createClient({ url })
  client.on('error', (err) => console.error('[chat-rate-limit] Redis TCP:', err))
  await client.connect()
  tcpClient = client as RedisClientType
  return tcpClient
}

function parseTrustedIps(): string[] {
  const raw = process.env.CHAT_TRUSTED_IPS ?? process.env.CHAT_TRUSTED_IP ?? ''
  return raw.split(',').map(s => s.trim()).filter(Boolean)
}

function isTrustedIp(ip: string): boolean {
  return parseTrustedIps().includes(ip)
}

function utcDayKey() {
  return new Date().toISOString().slice(0, 10)
}

/**
 * Limite journalière (UTC) : global + par IP.
 * IPs listées dans CHAT_TRUSTED_IP ou CHAT_TRUSTED_IPS (virgules) : pas de quota par IP, mais le quota global s’applique toujours.
 *
 * Fail-closed si Redis est absent ou injoignable.
 */
export async function assertChatRateLimit(event: H3Event) {
  const globalLimit = Number(process.env.CHAT_GLOBAL_LIMIT_PER_DAY) || DEFAULT_GLOBAL_PER_DAY
  const ipLimit = Number(process.env.CHAT_IP_LIMIT_PER_DAY) || DEFAULT_IP_PER_DAY
  await enforceDailyLimits({
    event,
    prefix: 'chat',
    globalLimit,
    ipLimit,
    label: 'chat-rate-limit',
  })
}

const DEFAULT_EMAIL_GLOBAL_PER_DAY = 40
const DEFAULT_EMAIL_IP_PER_DAY = 5

/** Rate limit pour /api/sendEmail (et tool contact du chat). */
export async function assertEmailRateLimit(event: H3Event) {
  const globalLimit = Number(process.env.EMAIL_GLOBAL_LIMIT_PER_DAY) || DEFAULT_EMAIL_GLOBAL_PER_DAY
  const ipLimit = Number(process.env.EMAIL_IP_LIMIT_PER_DAY) || DEFAULT_EMAIL_IP_PER_DAY
  await enforceDailyLimits({
    event,
    prefix: 'email',
    globalLimit,
    ipLimit,
    label: 'email-rate-limit',
  })
}
