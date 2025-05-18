import { ReactNode } from 'react'

type ICustomModalProps = {
  children?: ReactNode
  visible?: boolean
  containerStyle?: object
  overlayStyle?: object
  pressable?: boolean
  onPress?: () => void
}
type IInfoModal = {
  visible: boolean
  setVisible: () => void
  title?: string
  message?: string
  isSuccess?: boolean
  buttonText?: string
  backButton?: () => void
  buttonContainerSyle?: object
}
// type IInfoWithIconModal = {
//   visible: boolean
//   setVisible: () => void
//   title?: string
//   message?: string
//   buttonText?: string
// }
// type IILoaderModal = {
//   visible: boolean
// }
// type ICommingSoonModal = {
//   visible: boolean
// }
type IInternetModal = {
  visible: boolean
  lowInternet: boolean
}
type IAppVersionModal = {
  visible: boolean
  latestVersion: string
}
// type IAlertModal = {
//   visible: boolean
//   cancel: () => void
//   cancelButtonText?: string
//   confirm: undefined | (() => void)
//   confirmButtonText?: string
//   title?: string
//   message?: string
//   cancelButtonColor?: string
//   confirmButtonColor?: string
// }
// type IDynamicModal = {
//   visible: boolean
//   cancel: () => void
//   closeButton: () => void
//   children?: React.ReactElement
// }
// type IInfoModalFromBKProps = {
//   visible: boolean
//   cancel: () => void
//   cancelButtonText?: string
//   confirm: undefined | (() => void)
//   confirmButtonText?: string
//   title?: string
//   message?: string
//   cancelButtonColor?: string
//   confirmButtonColor?: string
// }
// type IAlertModalForBionPin = {
//   visible: boolean
//   cancel: () => void
//   cancelButtonText?: string
//   cancelButtonColor?: string
//   title?: string
//   onPressFingerPrint?: () => void
//   onComplete: (pin: string) => void
// }

// interface IUserCardDetails {
//   userName: string
//   address: string
//   city: string
//   country: string
//   zipCode: string
// }
// type IUserVirtualCardInfoDetails = {
//   visible: boolean
//   cancel: () => void
//   cancelButtonText?: string
//   cancelButtonColor?: string
//   title?: string
//   userDetails?: IUserCardDetails
// }
// type IAddMoneyFromCardModal = {
//   visible: boolean
//   cancel: () => void
//   cancelButtonText?: string
//   cancelButtonColor?: string
//   onNavigationStateChange: (item: any) => void
//   onMessage: (item: any) => void
//   onError: (item: any) => void
//   onLoadProgress: (item: nativeEvent) => void
//   redirectData: string
//   loading: boolean
// }
// type IPaymentModal = {
//   visible: boolean
//   title?: string
//   message?: string
//   isSuccess?: boolean
//   isError?: boolean
//   number?: string
//   button?: () => void
//   buttonText?: string
//   buttonColor?: string
// }
