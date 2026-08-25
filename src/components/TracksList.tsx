import { FC } from 'react'
import { TrackDetails } from './TrackDetails'
import useFetchTracks from '../hooks/useFetchTracks'
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
  const {
    tracks,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    error,
  } = useFetchTracks(playlistId, isOpen)

  if (isPending) return <p>Loading...</p>

  if (isError) {
    const status = (error as (Error & { status?: number }) | null)?.status
    const msg =
      status === 403
        ? 'Access denied (403). In Spotify Developer Dashboard, ensure your account is added under User Management.'
        : 'Failed to load tracks. Try closing and reopening the playlist.'
    return <p className="tracks-error">{msg}</p>
  }

  const knownTotal = totalTracks > 0 ? totalTracks : tracks.length

  return (
    <>
      {knownTotal > 0 && (
        <p>
          Showing {tracks.length} of {knownTotal} tracks
        </p>
      )}

      <div className="tracks-list">
        {tracks.map((track, i) => (
          <TrackDetails track={track} key={i} />
        ))}
        {hasNextPage && (
          <span
            className="show-more"
            onClick={() => {
              if (!isFetchingNextPage) fetchNextPage()
            }}
          >
            {isFetchingNextPage ? 'Loading…' : 'Show more...'}
          </span>
        )}
      </div>

      {knownTotal > 0 && tracks.length > 0 && (
        <p className="tracks-total">
          Showing {tracks.length} of {knownTotal} tracks
        </p>
      )}
    </>
  )
}
