type Image = {
  url: string
  height: number
  width: number
}

export type Playlist = {
  id: string
  images: Image[]
  name: string
  owner: {
    id: string
  }
  items: {
    total: number
  }
}

export type Artist = {
  id: string
  name: string
  genres?: string[]
  images?: Image[]
}

export type Track = {
  artists: Artist[]
  name: string
}
