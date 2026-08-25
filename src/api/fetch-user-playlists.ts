import { Playlist } from '../types'

type UserPlaylistsResponse = {
  items: Playlist[]
  next: string | null
}

export const fetchUserPlaylists = async (accessToken: string): Promise<Playlist[]> => {
  const all: Playlist[] = []
  let url: string | null =
    `${import.meta.env.VITE_SPOTIFY_API_URL}/me/playlists?limit=50`

  while (url) {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (!res.ok) throw new Error(`Failed to fetch user playlists: ${res.status}`)
    const data: UserPlaylistsResponse = await res.json()
    all.push(...data.items)
    url = data.next
  }

  return all
}
