import './App.scss'
import { PlaylistAccordion } from './components/PlaylistsAccordion'
import { ThemeToggleButton } from './components/ThemeToggleButton'
import { useAuth } from './contexts/AuthContext'

function App() {
  const { isAuthenticated, login, logout } = useAuth()

  return (
    <div className="container">
      <div className="header">
        <h1>Spotify playlists app</h1>
        <div className="header-buttons">
          {isAuthenticated ? (
            <button className="logout" onClick={logout}>
              Log out
            </button>
          ) : (
            <button className="login-button" onClick={login}>
              Log in with Spotify
            </button>
          )}
          <ThemeToggleButton />
        </div>
      </div>

      {isAuthenticated && (
        <div className="playlists-wrapper">
          <PlaylistAccordion />
        </div>
      )}
    </div>
  )
}

export default App
