import { FC } from 'react'
import useFetchArtist from '../hooks/useFetchArtist'
import './Artist.scss'

type ArtistProps = {
  id: string
  setIsOpen: (open: boolean) => void
}

export const Artist: FC<ArtistProps> = ({ id, setIsOpen }) => {
  const artist = useFetchArtist(id)

  return (
    <div className="artist">
      <span className="close" onClick={() => setIsOpen(false)}>
        ×
      </span>
      <img
        className="artist-image"
        src={artist?.images?.[0].url || ''}
        width={60}
        alt={artist.name}
      />
      <p className="artist-name">{artist.name}</p>
      <p className="artist-details">{`${artist.followers.total} followers`}</p>
      <p className="artist-details">{`${artist?.popularity}% popular`}</p>
      <p className="artist-details">Genres: {artist?.genres?.join(', ')}</p>
    </div>
  )
}
