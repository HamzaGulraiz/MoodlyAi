import colors from '@src/constants/colors'
import React, { FC } from 'react'
import { Modal, Pressable } from 'react-native'
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated'

import styles from './styles'
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const BottomSheet: FC<IBottomSheetProps> = ({
  isBottomSheetOpen,
  setIsBottomSheetOpen,
  children,
  sheetStyle = { height: '70%', backgroundColor: colors.WHITE },
  onClose,
}) => {
  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false)
    if (onClose) {
      onClose()
    }
  }

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isBottomSheetOpen}
      statusBarTranslucent
      onRequestClose={handleCloseBottomSheet}>
      <AnimatedPressable
        style={styles.backdrop}
        testID={'backdrop'}
        entering={FadeIn}
        exiting={FadeOut}
        onPress={(event) => event?.target === event?.currentTarget && handleCloseBottomSheet()}>
        <Animated.View
          entering={SlideInDown.springify().damping(15)}
          exiting={SlideOutDown}
          style={[styles.bottomSheet, sheetStyle]}>
          {children}
        </Animated.View>
      </AnimatedPressable>
    </Modal>
  )
}

export default BottomSheet
