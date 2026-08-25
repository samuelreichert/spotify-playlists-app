import { FC } from 'react'
import useFetchArtist from '../hooks/useFetchArtist'
import './Artist.scss'

type ArtistProps = {
  id: string
  setIsOpen: (open: boolean) => void
}

export const Artist: FC<ArtistProps> = ({ id, setIsOpen }) => {
  const { data: artist, isPending, isError } = useFetchArtist(id)

  return (
    <div className="artist">
      <span className="close" onClick={() => setIsOpen(false)}>
        ×
      </span>
      {isPending && <p>Loading…</p>}
      {isError && <p>Failed to load artist.</p>}
      {artist && (
        <>
          <img
            className="artist-image"
            src={artist.images?.[0]?.url || ''}
            width={60}
            alt={artist.name}
          />
          <p className="artist-name">{artist.name}</p>
          {artist.genres?.length ? (
            <p className="artist-details">Genres: {artist.genres.join(', ')}</p>
          ) : null}
        </>
      )}
    </div>
  )
}
