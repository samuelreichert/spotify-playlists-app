import { useEffect, useState } from 'react'
import { fetchPlaylists } from '../api/fetch-playlists'
import { Playlist } from '../types'
import useFetchAccessToken from './useFetchAccessToken'

const PLAYLISTS_IDS = [
  '37i9dQZF1DWXRqgorJj26U',
  '37i9dQZF1DWWGFQLoP9qlv',
  '37i9dQZEVXbKCF6dqVpDkS',
]

const useFetchAllPlaylists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const accessToken = useFetchAccessToken()

  useEffect(() => {
    const fetch = async () => {
      const newPlaylists = await fetchPlaylists({
        accessToken,
        playlistIds: PLAYLISTS_IDS,
      })

      setPlaylists(newPlaylists)
    }

    if (accessToken && playlists.length === 0) {
      fetch()
    }
  }, [accessToken, playlists])

  return playlists
}

export default useFetchAllPlaylists
