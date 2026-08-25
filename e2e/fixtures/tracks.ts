const ARTIST_ID = 'mock-artist-1'

export const buildTracksPage = (offset: number, limit = 20, total = 60) => {
  const items = Array.from({ length: limit }).map((_, i) => ({
    item: {
      name: `Mock Track ${offset + i + 1}`,
      artists: [{ id: ARTIST_ID, name: `Mock Artist ${offset + i + 1}` }],
      type: 'track',
    },
  }))

  const nextOffset = offset + limit
  return {
    items,
    next: nextOffset < total ? `https://api.spotify.com/v1/next?offset=${nextOffset}` : null,
    offset,
    limit,
    total,
  }
}

export { ARTIST_ID }
