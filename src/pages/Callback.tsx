import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { exchangeCodeForToken } from '../auth/spotify-auth'
import { useAuth } from '../contexts/AuthContext'

export const Callback = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { setAccessToken } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const exchangeStarted = useRef(false)

  useEffect(() => {
    if (exchangeStarted.current) return
    exchangeStarted.current = true

    const code = params.get('code')
    const errorParam = params.get('error')

    if (errorParam) {
      setError(errorParam)
      return
    }
    if (!code) {
      setError('Missing authorization code')
      return
    }

    exchangeCodeForToken(code)
      .then(tokens => {
        setAccessToken(tokens.access_token)
        navigate('/', { replace: true, viewTransition: true })
      })
      .catch(err => setError(err instanceof Error ? err.message : String(err)))
  }, [params, navigate, setAccessToken])

  if (error) {
    return (
      <div className="container">
        <h2>Login failed</h2>
        <p>{error}</p>
        <Link to="/">Back home</Link>
      </div>
    )
  }

  return (
    <div className="container">
      <p>Signing you in…</p>
    </div>
  )
}
