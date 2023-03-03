import { useEffect, useState } from 'react'
import { fetchTracks } from '../api/fetch-tracks'
import { Track } from '../types'
import useFetchAccessToken from './useFetchAccessToken'

const useFetchTracks = (playlistId: string) => {
  const [tracks, setTracks] = useState<Track[]>([])
  const [offset, setOffset] = useState(0)
  const accessToken = useFetchAccessToken()

  type FetchMoreTracksParams = { length: number }

  const fetchMoreTracks = ({ length }: FetchMoreTracksParams) =>
    setOffset(length)

  useEffect(() => {
    const fetch = async () => {
      const newTracks = await fetchTracks({
        accessToken,
        playlistId,
        offset,
      })
      setTracks(newTracks)
    }

    if (tracks.length === 0 || offset > 0) {
      fetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracks, offset])

  return {
    tracks,
    fetchMoreTracks,
  }
}

export default useFetchTracks
