import type { H3Event } from 'h3'

/**
 * Allow browser calls from the portfolio (and local/preview).
 * Spoofable with curl, but blocks naive Postman/bots without Origin.
 */
export function isAllowedPortfolioOrigin(event: H3Event): boolean {
  const origin = getHeader(event, 'origin')?.trim()
  const referer = getHeader(event, 'referer')?.trim()
  const candidate = origin || (referer
    ? (() => {
        try { return new URL(referer).origin } catch { return null }
      })()
    : null)

  if (!candidate) return false

  try {
    const url = new URL(candidate)
    const host = url.hostname.toLowerCase()
    if (host === 'localhost' || host === '127.0.0.1') return true
    if (host === 'johanncvl.com' || host === 'www.johanncvl.com') return true
    if (host.endsWith('.vercel.app') && host.includes('portfolio')) return true
    return false
  } catch {
    return false
  }
}

export function assertPortfolioOrigin(event: H3Event, label: string) {
  if (isAllowedPortfolioOrigin(event)) return

  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  console.warn(`[${label}] blocked (bad origin)`, {
    ip,
    ua: (getHeader(event, 'user-agent') ?? '').slice(0, 160),
    origin: getHeader(event, 'origin') ?? '',
    referer: (getHeader(event, 'referer') ?? '').slice(0, 160),
  })
  throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
}
