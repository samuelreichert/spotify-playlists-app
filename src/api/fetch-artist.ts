import { Artist } from '../types'

type FetchArtistParams = {
  accessToken: string
  artistId: string
}

export const fetchArtist = async ({
  accessToken,
  artistId,
}: FetchArtistParams): Promise<Artist> => {
  const url = `${import.meta.env.VITE_SPOTIFY_API_URL}/artists/${artistId}`
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch artist ${artistId}: ${res.status}`)
  }
  return res.json()
}
