import useTheme from '../hooks/useTheme'
import { Moon, Sun } from './Icons'
import './ThemeToggleButton.scss'

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme('light')
  return (
    <button className="theme-toggle-button" onClick={() => toggleTheme()}>
      {theme === 'light' && <Sun size={14} />}
      {theme === 'dark' && <Moon size={14} />}
    </button>
  )
}
