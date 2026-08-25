import { useQuery } from '@tanstack/react-query'
import { fetchArtist } from '../api/fetch-artist'
import { useAuth } from '../contexts/AuthContext'

const useFetchArtist = (artistId: string) => {
  const { accessToken } = useAuth()

  return useQuery({
    queryKey: ['artist', artistId],
    queryFn: () => fetchArtist({ accessToken: accessToken!, artistId }),
    enabled: !!accessToken && !!artistId,
    staleTime: Infinity,
  })
}

export default useFetchArtist
