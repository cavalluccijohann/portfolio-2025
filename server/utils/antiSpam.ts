function normalize(str: string) {
  return str.trim().replace(/\s+/g, ' ')
}

function hasSpaces(str: string) {
  return str.includes(' ')
}

function uppercaseRatio(str: string) {
  const letters = str.replace(/[^a-zA-Z]/g, '')
  if (!letters.length) return 1

  const upper = letters.replace(/[^A-Z]/g, '').length
  return upper / letters.length
}

function minLength(str: string, len: number) {
  return str.length >= len
}

function looksRandom(str: string) {
  return /^[A-Za-z]{10,}$/.test(str)
}

function wordCount(str: string) {
  return normalize(str).split(' ').length
}

function vowelRatio(str: string) {
  const letters = str.replace(/[^a-zA-Z]/g, '')
  if (!letters.length) return 0

  const vowels = letters.match(/[aeiouyAEIOUY]/g)?.length || 0
  return vowels / letters.length
}

export function isSpamContact(data: {
    name: string
    email: string
    message: string
}) {
  let score = 0

  const name = normalize(data.name)
  const message = normalize(data.message)
  const email = data.email.toLowerCase()

  if (!hasSpaces(name)) score++
  if (uppercaseRatio(name) > 0.6) score++
  if (looksRandom(name)) score++
  if (!minLength(name, 3)) score++

  if (!minLength(message, 20)) score++
  if (wordCount(message) < 3) score++
  if (uppercaseRatio(message) > 0.6) score++
  if (looksRandom(message)) score++
  if (vowelRatio(message) < 0.25) score++

  const disposableDomains = [
    'mailinator.com',
    'tempmail.com',
    'guerrillamail.com',
    '10minutemail.com',
  ]

  if (disposableDomains.some(d => email.endsWith(`@${d}`))) {
    score += 2
  }

  return score >= 3
}
