import { ReactNode } from 'react'
import { ViewStyle } from 'react-native'

type ICustomCardProps = {
  cardStyle?: ViewStyle
  children: ReactNode
  testID?: string
  onPress?: () => void
  disabled?: boolean
  activeOpacity?: number
}
