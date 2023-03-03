import { Playlist } from '../types'

type FetchPlaylistParams = {
  accessToken: string
  playlistIds: string[]
}

export const fetchPlaylists = async ({
  accessToken,
  playlistIds,
}: FetchPlaylistParams): Promise<Playlist[]> => {
  const fields = 'id,images,name,tracks.total'
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  const results = await Promise.all(
    playlistIds.map(async id => {
      const url = `${process.env.REACT_APP_SPOTIFY_API_URL}/playlists/${id}?fields=${fields}`
      const res = await fetch(url, options)
      return res.json()
    })
  )

  return results
}
