import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Accordion } from './Accordion'
import { renderWithProviders } from '../test/render'

describe('Accordion', () => {
  const props = {
    image: 'url',
    playlistId: 'abc',
    title: 'The ABC',
    totalTracks: 10,
  }

  it('renders Accordion', () => {
    renderWithProviders(<Accordion {...props} />)
    expect(screen.getByText('The ABC')).toBeInTheDocument()
  })

  it('shows details of the item', () => {
    renderWithProviders(<Accordion {...props} />)
    expect(screen.getByAltText('The ABC')).toBeInTheDocument()
    expect(screen.getByText('10 tracks')).toBeInTheDocument()
  })

  it('can expand the accordion', () => {
    renderWithProviders(<Accordion {...props} />)
    expect(screen.queryByTestId('accordion-content')).not.toBeInTheDocument()
    const accordion = screen.getByText('The ABC')
    fireEvent.click(accordion)

    expect(screen.getByTestId('accordion-content')).toBeInTheDocument()
  })
})
