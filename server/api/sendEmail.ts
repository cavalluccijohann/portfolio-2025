import { z } from 'zod'
import { sendContactEmail } from '../utils/sendContactEmail'
import { assertPortfolioOrigin } from '../utils/assertPortfolioOrigin'
import { assertEmailRateLimit } from '../utils/chatRateLimit'

const bodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(30).optional(),
  message: z.string().trim().min(1).max(5000),
  company: z.string().trim().max(200).optional(),
})

export default defineEventHandler(async (event) => {
  assertMethod(event, 'POST')
  assertPortfolioOrigin(event, 'sendEmail')
  await assertEmailRateLimit(event)

  try {
    const raw = await readBody(event)
    const parsed = bodySchema.safeParse(raw)
    if (!parsed.success) {
      // Soft-fail like honeypot: don't teach attackers the schema.
      return { ok: true }
    }
    return await sendContactEmail(parsed.data)
  } catch (error: unknown) {
    // Re-throw rate-limit / origin errors
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    console.error('Send email error:', error)
    return { ok: true }
  }
})
