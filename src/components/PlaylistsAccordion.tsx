import useFetchAllPlaylists from '../hooks/useFetchAllPlaylists'
import { Accordion } from './Accordion'
import './PlaylistsAccordion.scss'

export const PlaylistAccordion = () => {
  const playlists = useFetchAllPlaylists()

  return (
    <div className="playlists">
      {playlists.map(playlist => (
        <Accordion
          key={playlist.id}
          image={playlist.images[0].url}
          title={playlist.name}
          totalTracks={playlist.tracks.total}
          playlistId={playlist.id}
        />
      ))}
    </div>
  )
}
