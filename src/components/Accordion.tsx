import { FC, useState } from 'react'
import { ChevronDown, ChevronUp } from './Icons'
import { TracksList } from './TracksList'
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

  const toggleAccordion = () => {
    setOpen(prevState => !prevState)
  }

  return (
    <div className="accordion">
      <div className="accordion-summary" onClick={toggleAccordion}>
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
          <TracksList
            isOpen={isOpen}
            playlistId={playlistId}
            totalTracks={totalTracks}
          />
        </div>
      )}
    </div>
  )
}
