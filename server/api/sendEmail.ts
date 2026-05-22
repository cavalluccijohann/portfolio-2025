import { sendContactEmail } from '../utils/sendContactEmail'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    return await sendContactEmail(body)
  } catch (error) {
    console.error('Send email error:', error)
    return { ok: true }
  }
})
