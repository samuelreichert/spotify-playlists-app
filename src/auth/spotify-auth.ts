import { generateCodeChallenge, generateCodeVerifier } from './pkce'

const STORAGE_KEYS = {
  accessToken: 'spotify-access-token',
  refreshToken: 'spotify-refresh-token',
  expiresAt: 'spotify-expires-at',
  codeVerifier: 'spotify-code-verifier',
  scope: 'spotify-scope',
} as const

export const REQUIRED_SCOPES = [
  'playlist-read-private',
  'playlist-read-collaborative',
]

export const hasRequiredScopes = (): boolean => {
  const stored = localStorage.getItem(STORAGE_KEYS.scope) ?? ''
  const granted = new Set(stored.split(' ').filter(Boolean))
  return REQUIRED_SCOPES.every(s => granted.has(s))
}

const AUTHORIZE_URL = 'https://accounts.spotify.com/authorize'
const SCOPES = 'playlist-read-private playlist-read-collaborative'

type TokenResponse = {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token?: string
  scope?: string
}

export const redirectToAuthorize = async (): Promise<void> => {
  const verifier = generateCodeVerifier()
  const challenge = await generateCodeChallenge(verifier)
  sessionStorage.setItem(STORAGE_KEYS.codeVerifier, verifier)

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
    code_challenge_method: 'S256',
    code_challenge: challenge,
    scope: SCOPES,
    show_dialog: 'true',
  })

  window.location.assign(`${AUTHORIZE_URL}?${params.toString()}`)
}

const persistTokens = (tokens: TokenResponse): void => {
  localStorage.setItem(STORAGE_KEYS.accessToken, tokens.access_token)
  if (tokens.refresh_token) {
    localStorage.setItem(STORAGE_KEYS.refreshToken, tokens.refresh_token)
  }
  if (tokens.scope) {
    localStorage.setItem(STORAGE_KEYS.scope, tokens.scope)
  }
  localStorage.setItem(
    STORAGE_KEYS.expiresAt,
    String(Date.now() + tokens.expires_in * 1000)
  )
}

export const exchangeCodeForToken = async (
  code: string
): Promise<TokenResponse> => {
  const verifier = sessionStorage.getItem(STORAGE_KEYS.codeVerifier)
  if (!verifier) {
    throw new Error('Missing PKCE code verifier')
  }

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    code_verifier: verifier,
  })

  const res = await fetch(import.meta.env.VITE_SPOTIFY_AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })

  if (!res.ok) {
    throw new Error(`Token exchange failed: ${res.status}`)
  }

  const tokens = (await res.json()) as TokenResponse
  persistTokens(tokens)
  sessionStorage.removeItem(STORAGE_KEYS.codeVerifier)
  return tokens
}

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem(STORAGE_KEYS.refreshToken)
  if (!refreshToken) return null

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  })

  const res = await fetch(import.meta.env.VITE_SPOTIFY_AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })

  if (!res.ok) return null

  const tokens = (await res.json()) as TokenResponse
  persistTokens(tokens)
  return tokens.access_token
}

export const getStoredAccessToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.accessToken)
}

export const getAccessToken = async (): Promise<string | null> => {
  const token = localStorage.getItem(STORAGE_KEYS.accessToken)
  const expiresAt = Number(localStorage.getItem(STORAGE_KEYS.expiresAt) ?? 0)
  const isExpiringSoon = expiresAt - 60_000 < Date.now()

  if (token && !isExpiringSoon) return token
  return refreshAccessToken()
}

export const logout = (): void => {
  localStorage.removeItem(STORAGE_KEYS.accessToken)
  localStorage.removeItem(STORAGE_KEYS.refreshToken)
  localStorage.removeItem(STORAGE_KEYS.expiresAt)
  localStorage.removeItem(STORAGE_KEYS.scope)
}
