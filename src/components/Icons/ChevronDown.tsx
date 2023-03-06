import { FC } from 'react'
import { Icon, IconProps } from './Icon'

export const ChevronDown: FC<IconProps> = props => {
  return (
    <Icon {...props}>
      <polyline points="6 9 12 15 18 9"></polyline>
    </Icon>
  )
}
