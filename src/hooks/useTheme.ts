import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
const useTheme = (defaultTheme: Theme) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  useEffect(() => {
    document.body.className = theme
  }, [theme])

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return { theme, toggleTheme }
}

export default useTheme
