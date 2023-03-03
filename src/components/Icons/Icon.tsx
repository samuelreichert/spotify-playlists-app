import { FC, PropsWithChildren } from 'react'

export type IconProps = {
  size?: number
}

export const Icon: FC<IconProps & PropsWithChildren> = ({
  children,
  size = 24,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  )
}
