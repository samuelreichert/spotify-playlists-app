import { FC, useEffect } from 'react'
import { TrackDetails } from './TrackDetails'
import useLocalStorage from '../hooks/useLocalStorage'
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
  const [allTracks, setTracks] = useLocalStorage(`tracks-${playlistId}`, [])
  const { fetchTracksFromPlaylist, tracks } = useFetchTracks()

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

      {isOpen && allTracks.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="tracks-list">
          {allTracks.map((track: Track, i: number) => {
            return <TrackDetails track={track} key={i} />
          })}
          {allTracks.length < totalTracks && (
            <span
              className="show-more"
              onClick={() =>
                fetchTracksFromPlaylist({
                  length: allTracks.length,
                  playlistId,
                })
              }
            >
              Show more...
            </span>
          )}
        </div>
      )}

      <p className="tracks-total">
        Showing {allTracks.length} of {totalTracks} tracks
      </p>
    </>
  )
}
