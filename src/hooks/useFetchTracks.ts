import { useEffect, useState } from 'react'
import { fetchTracks } from '../api/fetch-tracks'
import { Track } from '../types'
import useFetchAccessToken from './useFetchAccessToken'

const useFetchTracks = () => {
  const [playlistId, setPlaylistId] = useState('')
  const [tracks, setTracks] = useState<Track[]>([])
  const [offset, setOffset] = useState(0)
  const accessToken = useFetchAccessToken()

  type FetchMoreTracksParams = {
    length: number
    playlistId: string
  }

  const fetchTracksFromPlaylist = ({
    length = 0,
    playlistId,
  }: FetchMoreTracksParams) => {
    console.log(length, playlistId)
    setOffset(length)
    setPlaylistId(playlistId)
  }

  useEffect(() => {
    const fetch = async () => {
      const newTracks = await fetchTracks({
        accessToken,
        playlistId,
        offset,
      })
      setTracks(newTracks)
    }

    if (accessToken && playlistId) {
      console.log('here')
      fetch()
    }
  }, [accessToken, offset, playlistId])

  return {
    tracks,
    fetchTracksFromPlaylist,
  }
}

export default useFetchTracks
