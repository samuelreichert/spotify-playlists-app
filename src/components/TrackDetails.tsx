import { FC, useState } from 'react'
import { Track } from '../types'
import { Artist } from './Artist'
import './TrackDetails.scss'

export const TrackDetails: FC<{ track: Track }> = ({ track }) => {
  const [isArtistOpen, setArtistOpen] = useState(false)

  return (
    <div className="track">
      <p className="track-name">{track.name}</p>
      <p className="track-artist" onClick={() => setArtistOpen(true)}>
        {track.artists[0].name}
      </p>
      {isArtistOpen && (
        <Artist id={track.artists[0].id} setIsOpen={setArtistOpen} />
      )}
    </div>
  )
}
