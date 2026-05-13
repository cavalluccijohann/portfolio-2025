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
 * Redis :
 * - Upstash REST : UPSTASH_REDIS_REST_URL (https://…) + UPSTASH_REDIS_REST_TOKEN
 * - Redis Cloud / TCP : REDIS_URL=rediss://… **ou** REDIS_HOST + REDIS_PASSWORD (+ REDIS_PORT, REDIS_USERNAME)
 */
export async function assertChatRateLimit(event: H3Event) {
  const redis = await getStore()
  if (!redis) {
    const rawUpstash = process.env.UPSTASH_REDIS_REST_URL?.trim()
    const hasBadUpstash = Boolean(rawUpstash && !rawUpstash.startsWith('https://'))
    console.warn(
      hasBadUpstash
        ? '[chat-rate-limit] UPSTASH_REDIS_REST_URL doit être une URL REST https:// (Upstash). Pour Redis Cloud, utilise REDIS_URL=rediss://… ou REDIS_HOST + REDIS_PASSWORD (+ port). — pas de limite appliquée'
        : '[chat-rate-limit] Aucun Redis configuré (Upstash https + token, ou REDIS_URL / REDIS_HOST+PASSWORD) — pas de limite appliquée',
    )
    return
  }

  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  const day = utcDayKey()
  const globalKey = `chat:ratelimit:global:${day}`
  const ipKey = `chat:ratelimit:ip:${ip}:${day}`

  const globalLimit = Number(process.env.CHAT_GLOBAL_LIMIT_PER_DAY) || DEFAULT_GLOBAL_PER_DAY
  const ipLimit = Number(process.env.CHAT_IP_LIMIT_PER_DAY) || DEFAULT_IP_PER_DAY
  const trusted = isTrustedIp(ip)

  const globalCount = await redis.incr(globalKey)
  if (globalCount === 1) await redis.expire(globalKey, KEY_TTL_SECONDS)

  if (globalCount > globalLimit) {
    console.warn(
      `[chat-rate-limit] 429 site | jour UTC ${day} | compteur ${globalCount} > limite ${globalLimit} (IP ${ip})`,
    )
    await redis.decr(globalKey)
    throw createError({
      statusCode: 429,
      statusMessage: 'Daily limit for this site has been reached. Try again tomorrow.',
    })
  }

  if (!trusted) {
    const ipCount = await redis.incr(ipKey)
    if (ipCount === 1) await redis.expire(ipKey, KEY_TTL_SECONDS)
    if (ipCount > ipLimit) {
      console.warn(
        `[chat-rate-limit] 429 IP | jour UTC ${day} | IP ${ip} : ${ipCount} > limite ${ipLimit} | site ${globalCount}/${globalLimit}`,
      )
      await redis.decr(ipKey)
      await redis.decr(globalKey)
      throw createError({
        statusCode: 429,
        statusMessage: 'Daily question limit reached for this connection. Try again tomorrow.',
      })
    }
    console.log(
      `[chat-rate-limit] OK | jour UTC ${day} | site (jour) ${globalCount}/${globalLimit} | cette IP ${ipCount}/${ipLimit} | ip=${ip}`,
    )
  } else {
    console.log(
      `[chat-rate-limit] OK | jour UTC ${day} | site (jour) ${globalCount}/${globalLimit} | IP trusted (pas de quota IP) | ip=${ip}`,
    )
  }
}
