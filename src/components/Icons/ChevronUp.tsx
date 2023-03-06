import { FC } from 'react'
import { Icon, IconProps } from './Icon'

export const ChevronUp: FC<IconProps> = props => {
  return (
    <Icon {...props}>
      <polyline points="18 15 12 9 6 15"></polyline>
    </Icon>
  )
}
