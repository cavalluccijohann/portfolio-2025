import type { H3Event } from 'h3'

/**
 * Allow browser calls from the portfolio (and local/preview).
 * Spoofable with curl — pair with assertBrowserLikeRequest for chat.
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

function logBlock(label: string, event: H3Event, reason: string) {
  console.warn(`[${label}] blocked (${reason})`, {
    ip: getRequestIP(event, { xForwardedFor: true }) ?? 'unknown',
    ua: (getHeader(event, 'user-agent') ?? '').slice(0, 160),
    origin: getHeader(event, 'origin') ?? '',
    referer: (getHeader(event, 'referer') ?? '').slice(0, 160),
    secFetchSite: getHeader(event, 'sec-fetch-site') ?? '',
    secFetchMode: getHeader(event, 'sec-fetch-mode') ?? '',
  })
}

export function assertPortfolioOrigin(event: H3Event, label: string) {
  if (isAllowedPortfolioOrigin(event)) return
  logBlock(label, event, 'bad origin')
  throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
}

const BOT_UA
  = /\b(curl|wget|python-requests|python-urllib|go-http-client|java\/|okhttp|postman|insomnia|httpie|aiohttp|node-fetch|undici|libwww-perl|scrapy|httpclient)\b/i

/**
 * Extra checks that real browsers send and most scripts forget.
 * Not perfect, but stops Origin-spoofing cron bots that only set Origin.
 */
export function assertBrowserLikeRequest(event: H3Event, label: string) {
  const ua = getHeader(event, 'user-agent') ?? ''
  if (!ua || ua.length < 12 || BOT_UA.test(ua)) {
    logBlock(label, event, 'bad user-agent')
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  // Browsers send these on fetch() to same site; curl usually does not.
  const site = (getHeader(event, 'sec-fetch-site') ?? '').toLowerCase()
  const mode = (getHeader(event, 'sec-fetch-mode') ?? '').toLowerCase()
  const origin = (getHeader(event, 'origin') ?? '').toLowerCase()
  const isLocal = origin.includes('localhost') || origin.includes('127.0.0.1')
  const siteAllowed
    = site === 'same-origin'
      || site === 'same-site'
      || (site === 'none' && isLocal)

  if (!site || !siteAllowed) {
    logBlock(label, event, `bad sec-fetch-site=${site || 'missing'}`)
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  // fetch() uses cors; navigate/no-cors would be weird for our chat client
  if (mode && mode !== 'cors' && mode !== 'same-origin') {
    logBlock(label, event, `bad sec-fetch-mode=${mode}`)
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }
}
