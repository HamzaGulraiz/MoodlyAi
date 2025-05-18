import { TouchableOpacityProps } from 'react-native'

interface ICustomButtonProps extends TouchableOpacityProps {
  title: string
  loadingMessage?: string
  activityLoaderColor?: string
  testID?: string
  buttonStyle?: ViewStyle
  textStyle?: ViewStyle
  isLoading?: boolean
}
