import { useEffect } from 'react'
import { authenticate } from '../api/authenticate'
import useLocalStorage from './useLocalStorage'

const useFetchAccessToken = () => {
  const [accessToken, setAccessToken] = useLocalStorage(
    'spotify-access-token',
    ''
  )

  useEffect(() => {
    const fetchToken = async () => {
      const newAccessToken = await authenticate()
      setAccessToken(newAccessToken)
    }

    if (accessToken === '') {
      fetchToken()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])

  return accessToken
}

export default useFetchAccessToken
