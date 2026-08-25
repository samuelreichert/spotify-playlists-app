export type CurrentUser = {
  id: string
}

export const fetchCurrentUser = async (accessToken: string): Promise<CurrentUser> => {
  const res = await fetch(`${import.meta.env.VITE_SPOTIFY_API_URL}/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch current user: ${res.status}`)
  }
  return res.json()
}
