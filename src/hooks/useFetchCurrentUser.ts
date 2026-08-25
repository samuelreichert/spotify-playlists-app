import { useQuery } from '@tanstack/react-query'
import { fetchCurrentUser } from '../api/fetch-current-user'
import { useAuth } from '../contexts/AuthContext'

const useFetchCurrentUser = () => {
  const { accessToken } = useAuth()

  return useQuery({
    queryKey: ['current-user'],
    queryFn: () => fetchCurrentUser(accessToken!),
    enabled: !!accessToken,
    staleTime: Infinity,
  })
}

export default useFetchCurrentUser
