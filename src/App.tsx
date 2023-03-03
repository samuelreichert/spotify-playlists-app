import React from 'react'
import './App.scss'
import { ThemeToggleButton } from './components/ThemeToggleButton'

function App() {
  return (
    <div className="container">
      <div className="header">
        <h1>Spotify playlists app</h1>

        <ThemeToggleButton />
      </div>
    </div>
  )
}

export default App
