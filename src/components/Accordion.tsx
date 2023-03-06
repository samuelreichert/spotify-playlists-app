import { FC, useState } from 'react'
import { ChevronDown, ChevronUp } from './Icons'
import './Accordion.scss'

type AccordionProps = {
  image: string
  playlistId: string
  title: string
  totalTracks: number
}

export const Accordion: FC<AccordionProps> = ({
  image,
  playlistId,
  title,
  totalTracks,
}) => {
  const [isOpen, setOpen] = useState(false)
  const [allTracks, setTracks] = useState([])

  const fetchTracks = () => {
    if (!isOpen && allTracks.length === 0) {
      // fetchTracks
      // fetch tracks with id
      console.log(playlistId)
    }

    toggleAccordion()
  }

  const toggleAccordion = () => {
    if (isOpen) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }

  return (
    <div className="accordion" onClick={fetchTracks}>
      <div className="accordion-summary">
        <div className="accordion-summary-content">
          <div className="accordion-image">
            <img src={image} alt={title} />
            <span>{totalTracks} tracks</span>
          </div>
          <h3>{title}</h3>
        </div>
        {!isOpen && <ChevronDown />}
        {isOpen && <ChevronUp />}
      </div>

      {isOpen && (
        <div className="accordion-content" data-testid="accordion-content">
          <p>
            Showing {allTracks.length} of {totalTracks} tracks
          </p>
        </div>
      )}
    </div>
  )
}
