import { Track } from '../types'

type FetchTracksParams = {
  accessToken: string
  offset?: number
  playlistId: string
}

export const fetchTracks = async ({
  accessToken,
  offset = 0,
  playlistId,
}: FetchTracksParams): Promise<Track[]> => {
  const fields = 'items(track(name,artists(id,name)))'
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
  const url = `${process.env.REACT_APP_SPOTIFY_API_URL}/playlists/${playlistId}/tracks?fields=${fields}&offset=${offset}&limit=20`

  const res = await fetch(url, options)
  const response = await res.json()
  const tracks = response.items.map((item: { track: Track }) => item.track)

  return tracks
}
