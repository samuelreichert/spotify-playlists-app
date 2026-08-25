const VERIFIER_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'

const base64UrlEncode = (bytes: ArrayBuffer): string => {
  const binary = String.fromCharCode(...new Uint8Array(bytes))
  return btoa(binary).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

export const generateCodeVerifier = (length = 64): string => {
  const random = new Uint8Array(length)
  crypto.getRandomValues(random)
  let verifier = ''
  for (let i = 0; i < length; i++) {
    verifier += VERIFIER_CHARS[random[i] % VERIFIER_CHARS.length]
  }
  return verifier
}

export const generateCodeChallenge = async (
  verifier: string
): Promise<string> => {
  const data = new TextEncoder().encode(verifier)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return base64UrlEncode(digest)
}
