import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import {
  getStoredAccessToken,
  hasRequiredScopes,
  logout as authLogout,
  redirectToAuthorize,
} from '../auth/spotify-auth'

type AuthContextValue = {
  accessToken: string | null
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  setAccessToken: (token: string | null) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    const token = getStoredAccessToken()
    if (token && !hasRequiredScopes()) {
      authLogout()
      return null
    }
    return token
  })

  useEffect(() => {
    const onStorage = () => setAccessToken(getStoredAccessToken())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const login = useCallback(() => {
    void redirectToAuthorize()
  }, [])

  const logout = useCallback(() => {
    authLogout()
    setAccessToken(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated: !!accessToken,
        login,
        logout,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
