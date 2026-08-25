import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchTracks, PAGE_SIZE } from '../api/fetch-tracks'
import { Track } from '../types'
import { useAuth } from '../contexts/AuthContext'

const useFetchTracks = (playlistId: string, enabled: boolean) => {
  const { accessToken } = useAuth()

  const query = useInfiniteQuery({
    queryKey: ['tracks', playlistId],
    queryFn: ({ pageParam }) =>
      fetchTracks({
        accessToken: accessToken!,
        playlistId,
        offset: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: last =>
      last.next ? last.offset + PAGE_SIZE : undefined,
    enabled: !!accessToken && !!playlistId && enabled,
    staleTime: 5 * 60 * 1000,
  })

  const tracks: Track[] =
    query.data?.pages.flatMap(p =>
      p.items.flatMap(i => i.item?.type === 'track' && i.item.artists?.length ? [i.item] : [])
    ) ?? []

  return {
    tracks,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isPending: query.isPending,
    isError: query.isError,
    error: query.error,
  }
}

export default useFetchTracks
