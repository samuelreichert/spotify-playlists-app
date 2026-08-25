import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ThemeToggleButton } from './ThemeToggleButton'

describe('ThemeToggleButton', () => {
  it('renders theme toggle button', () => {
    render(<ThemeToggleButton />)
    expect(screen.getByTestId('theme-button')).toBeInTheDocument()
  })

  it('changes theme to dark when click', () => {
    render(<ThemeToggleButton />)
    const button = screen.getByTestId('theme-button')
    fireEvent.click(button)
    expect(document.body).toHaveClass('dark')
  })
})
