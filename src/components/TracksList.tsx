import { FC, useEffect, useState } from 'react'
import { TrackDetails } from './TrackDetails'
import useFetchTracks from '../hooks/useFetchTracks'
import { Track } from '../types'
import './TracksList.scss'

type TracksListProps = {
  isOpen: boolean
  playlistId: string
  totalTracks: number
}

export const TracksList: FC<TracksListProps> = ({
  isOpen,
  playlistId,
  totalTracks,
}) => {
  const [allTracks, setTracks] = useState<Track[] | []>([])
  const { fetchTracksFromPlaylist, tracks } = useFetchTracks()
  console.log(tracks)

  useEffect(() => {
    if (isOpen && allTracks.length === 0) {
      fetchTracksFromPlaylist({ length: allTracks.length, playlistId })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTracks.length, isOpen])

  useEffect(() => {
    if (tracks.length > 0) {
      setTracks([...allTracks, ...tracks])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracks])

  return (
    <>
      <p>
        Showing {allTracks.length} of {totalTracks} tracks
      </p>
      {isOpen && allTracks.length === 0 && <p>Loading...</p>}
      <div className="tracks-list">
        {allTracks.map((track, i) => {
          return <TrackDetails track={track} key={i} />
        })}
        {allTracks.length < totalTracks && (
          <span
            className="show-more"
            onClick={() =>
              fetchTracksFromPlaylist({ length: allTracks.length, playlistId })
            }
          >
            Show more...
          </span>
        )}
        <p className="tracks-total">
          Showing {allTracks.length} of {totalTracks} tracks
        </p>
      </div>
    </>
  )
}
