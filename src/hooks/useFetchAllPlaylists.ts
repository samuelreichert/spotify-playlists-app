import { useQuery } from '@tanstack/react-query'
import { fetchUserPlaylists } from '../api/fetch-user-playlists'
import { useAuth } from '../contexts/AuthContext'

const useFetchAllPlaylists = () => {
  const { accessToken } = useAuth()

  return useQuery({
    queryKey: ['playlists', 'me'],
    queryFn: () => fetchUserPlaylists(accessToken!),
    enabled: !!accessToken,
    staleTime: 5 * 60 * 1000,
  })
}

export default useFetchAllPlaylists
