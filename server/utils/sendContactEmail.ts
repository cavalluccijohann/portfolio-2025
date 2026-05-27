import { Resend } from 'resend'
import { isSpamContact } from './antiSpam'

const resend = new Resend(process.env.resendApiKey)

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

  await resend.emails.send({
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
