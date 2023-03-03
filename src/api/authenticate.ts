export const authenticate = async () => {
  const url: string = process.env.REACT_APP_SPOTIFY_AUTH_URL || ''
  const authHeader = process.env.REACT_APP_AUTHENTICATION_HEADER || ''
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: `Basic ${authHeader}`,
    },
    body: 'grant_type=client_credentials',
  }

  try {
    const res = await fetch(url, options)
    const response = await res.json()
    return response.access_token
  } catch (error) {
    console.error('Error', error)
  }
}
