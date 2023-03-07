import { useEffect } from 'react'
import { fetchArtist } from '../api/fetch-artist'
import { Artist } from '../types'
import useFetchAccessToken from './useFetchAccessToken'
import useLocalStorage from './useLocalStorage'

const useFetchArtist = (artistId: string) => {
  const accessToken = useFetchAccessToken()
  const [artist, setArtist] = useLocalStorage(artistId, {})

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchArtist({ accessToken, artistId })
      setArtist(result)
    }

    if (accessToken && artistId && Object.keys(artist).length === 0) {
      fetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, artistId, artist])

  return artist as Artist
}

export default useFetchArtist
