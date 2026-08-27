import { pingChatRedis } from '../../utils/chatRateLimit'

/**
 * Redis Keepalive (Upstash free) — called by Vercel Cron every week.
 * Protected by `Authorization: Bearer $CRON_SECRET` (automatically injected by Vercel if the variable is defined).
 */
export default defineEventHandler(async (event) => {
  const secret = process.env.CRON_SECRET?.trim()
  if (!secret) {
    throw createError({ statusCode: 503, statusMessage: 'CRON_SECRET not configured' })
  }

  const auth = getHeader(event, 'authorization')
  if (auth !== `Bearer ${secret}`) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  try {
    await pingChatRedis()
    console.log('[cron/redis-keepalive] OK')
    return { ok: true, at: new Date().toISOString() }
  } catch (err) {
    console.error('[cron/redis-keepalive] FAILED:', err)
    throw createError({
      statusCode: 503,
      statusMessage: 'Redis keepalive failed',
    })
  }
})
