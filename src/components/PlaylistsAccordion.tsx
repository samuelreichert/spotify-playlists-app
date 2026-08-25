import useFetchAllPlaylists from '../hooks/useFetchAllPlaylists'
import useFetchCurrentUser from '../hooks/useFetchCurrentUser'
import { Accordion } from './Accordion'
import './PlaylistsAccordion.scss'

export const PlaylistAccordion = () => {
  const { data: playlists, isPending, isError, error } = useFetchAllPlaylists()
  const { data: currentUser } = useFetchCurrentUser()

  if (isPending) return <p>Loading playlists…</p>
  if (isError) return <p>Failed to load playlists: {error.message}</p>

  const valid = playlists.filter(p => p != null && p.id && p.owner?.id === currentUser?.id)

  if (valid.length === 0) {
    return <p>No playlists found in your Spotify account.</p>
  }

  return (
    <div className="playlists">
      {valid.map(playlist => (
        <Accordion
          key={playlist.id}
          image={playlist.images?.[0]?.url ?? ''}
          title={playlist.name}
          totalTracks={playlist.items?.total ?? 0}
          playlistId={playlist.id}
        />
      ))}
    </div>
  )
}
