type Image = {
  url: string
  height: number
  width: number
}

export type Playlist = {
  id: string
  images: Image[]
  name: string
  tracks: {
    total: number
  }
}

export type Artist = {
  id: string
  name: string
  genres?: string[]
  images?: Image[]
  popularity?: number
  followers: {
    total: number
  }
}

export type Track = {
  artists: Artist[]
  name: string
}
