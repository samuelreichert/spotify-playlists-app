import { screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import App from './App'
import { renderWithProviders } from './test/render'

test('renders app heading', () => {
  renderWithProviders(<App />)
  expect(screen.getByText(/Spotify playlists app/i)).toBeInTheDocument()
})
