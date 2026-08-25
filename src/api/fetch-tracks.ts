import { Track } from '../types'

type FetchTracksParams = {
  accessToken: string
  offset?: number
  playlistId: string
}

export type TracksPage = {
  items: { item: (Track & { type: string }) | null }[]
  next: string | null
  offset: number
  total: number
  limit: number
}

export const PAGE_SIZE = 20

export const fetchTracks = async ({
  accessToken,
  offset = 0,
  playlistId,
}: FetchTracksParams): Promise<TracksPage> => {
  const fields = 'items(item(name,artists(id,name),type)),next,offset,total,limit'
  const params = new URLSearchParams({
    fields,
    offset: String(offset),
    limit: String(PAGE_SIZE),
  })
  const url = `${import.meta.env.VITE_SPOTIFY_API_URL}/playlists/${playlistId}/items?${params}`

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    const err = new Error(`Failed to fetch tracks: ${res.status}${body ? ` — ${body}` : ''}`) as Error & { status: number }
    err.status = res.status
    throw err
  }
  return res.json()
}
