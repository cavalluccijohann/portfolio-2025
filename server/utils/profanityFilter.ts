import leoProfanity from 'leo-profanity'

let initialized = false

function ensureInit(): void {
  if (initialized) return
  leoProfanity.clearList()
  leoProfanity.add(leoProfanity.getDictionary('en'))
  leoProfanity.add(leoProfanity.getDictionary('fr'))
  initialized = true
}

/**
 * Returns true if the text contains at least one profane word
 * (English or French dictionaries).
 */
export function containsProfanity(text: string): boolean {
  ensureInit()
  return leoProfanity.check(text)
}
