import { ReactNode } from 'react'

type ICustomBackGroundProps = {
  children?: ReactNode
  avoidKeyboard?: boolean
  showsVerticalScrollIndicator?: boolean
  useLinear?: boolean
  refreshing?: boolean
  onRefresh?: () => void
}
