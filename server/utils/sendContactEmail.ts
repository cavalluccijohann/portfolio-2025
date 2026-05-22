import { Resend } from 'resend'
import { isSpamContact } from './antiSpam'

const resend = new Resend(process.env.resendApiKey)

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

  await resend.emails.send({
    from: '📩 - CONTACT PORTFOLIO <contact@johanncvl.com>',
    to: ['24johann.cavallucci@gmail.com'],
    subject: 'New message from your portfolio',
    html: `
        <p>Nouvelle demande de contact :</p>
        <ul>
          <li><b>Nom :</b> ${name}</li>
          <li><b>Email :</b> ${email}</li>
          <li><b>Téléphone :</b> ${phone || '—'}</li>
          <li><b>Message :</b><br/>${message}</li>
        </ul>
      `,
  })

  return { ok: true }
}
