import React from 'react'
import './App.scss'
import { PlaylistAccordion } from './components/PlaylistsAccordion'
import { ThemeToggleButton } from './components/ThemeToggleButton'

function App() {
  return (
    <div className="container">
      <div className="header">
        <h1>Spotify playlists app</h1>

        <ThemeToggleButton />
      </div>

      <PlaylistAccordion />
    </div>
  )
}

export default App
