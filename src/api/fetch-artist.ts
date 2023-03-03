import { Artist } from '../types'

type FetchArtistParams = {
  accessToken: string
  artistId: string
}

export const fetchArtist = async ({
  accessToken,
  artistId,
}: FetchArtistParams): Promise<Artist> => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
  const url = `${process.env.REACT_APP_SPOTIFY_API_URL}/artists/${artistId}`

  const res = await fetch(url, options)
  const response = await res.json()
  const artist = response

  return artist
}
