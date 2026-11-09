import { Resend } from 'resend'
import { isSpamContact } from './antiSpam'

let resend: Resend | null = null

/** Lazily created so a missing key only breaks the contact feature, not the whole server. */
function getResend(): Resend {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY ?? process.env.resendApiKey
    if (!apiKey) throw new Error('RESEND_API_KEY is not configured')
    resend = new Resend(apiKey)
  }
  return resend
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function sendContactEmail(body: {
  name: string
  email: string
  phone?: string
  message: string
  company?: string
}): Promise<{ ok: true }> {
  const { name, email, phone, message, company } = body

  if (!name || !email || !message) {
    return { ok: true }
  }

  if (company) {
    return { ok: true }
  }

  if (isSpamContact({ name, email, message })) {
    return { ok: true }
  }

  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safePhone = phone ? escapeHtml(phone) : '—'

  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>')

  await getResend().emails.send({
    from: '📩 - CONTACT PORTFOLIO <contact@johanncvl.com>',
    to: ['24johann.cavallucci@gmail.com'],
    subject: 'New message from your portfolio',
    html: `
        <p>Nouvelle demande de contact :</p>
        <ul>
          <li><b>Nom :</b> ${safeName}</li>
          <li><b>Email :</b> ${safeEmail}</li>
          <li><b>Téléphone :</b> ${safePhone}</li>
          <li><b>Message :</b><br/>${safeMessage}</li>
        </ul>
      `,
  })

  return { ok: true }
}
