interface IBottomSheetProps {
  isBottomSheetOpen: boolean
  setIsBottomSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
  children?: React.ReactNode | React.ReactNodeArray
  sheetStyle?: ViewStyle
  header?: React.ReactNode | React.ReactNodeArray
  onClose?: () => void
}

interface IUploadImageBottomSheetProps {
  isBottomSheetOpen: boolean
  setIsBottomSheetOpen: () => void
  onDelete?: () => void
  onCamera: () => void
  onGallery: () => void
}
