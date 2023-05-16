import { BANNED_CODES } from '~/utils/constants'

export function isBannedCode(url: string, code: string): false | string {
  // Don't filter code if it's in the url
  if (url.includes(code))
    return false

  // Check if code is in the list of banned codes and return the reason
  const bannedCode = BANNED_CODES.find(bannedCode => code.includes(bannedCode.code))

  if (bannedCode)
    return bannedCode.reason

  return false
}
