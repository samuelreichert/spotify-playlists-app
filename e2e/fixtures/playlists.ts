export const playlistFixtures = [1, 2, 3].map(i => ({
  id: `mock-playlist-${i}`,
  name: `Mock Playlist ${i}`,
  images: [
    {
      url: `https://example.com/playlist-${i}.jpg`,
      height: 640,
      width: 640,
    },
  ],
  tracks: { total: 60 },
}))
