import { useEffect, useState } from 'react'
import { fetchArtist } from '../api/fetch-artist'
import { Artist } from '../types'
import useFetchAccessToken from './useFetchAccessToken'

const useFetchArtist = (artistId: string) => {
  const [artist, setArtist] = useState<Artist>()
  const accessToken = useFetchAccessToken()

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchArtist({ accessToken, artistId })
      setArtist(result)
    }

    if (accessToken && !artist) {
      fetch()
    }
  }, [accessToken, artist, artistId])

  return artist
}

export default useFetchArtist
