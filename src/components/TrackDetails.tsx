import { FC } from 'react'
import { Track } from '../types'
import './TrackDetails.scss'

export const TrackDetails: FC<{ track: Track }> = ({ track }) => {
  return (
    <div className="track">
      <p className="track-name">{track.name}</p>
      <p className="track-artist">{track.artists[0].name}</p>
    </div>
  )
}
