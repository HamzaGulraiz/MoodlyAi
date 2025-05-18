import CustomButton from '@src/components/button'
import CustomModal from '@src/components/modal/index'
import React, { FC } from 'react'
import { Text } from 'react-native'

import styles from './styles'
import LottieView from 'lottie-react-native'
import loader from '@src/assets/loader/loader'
import { IInfoModal } from '@src/@types/modals'

const CustomInfoModal: FC<IInfoModal> = ({
  visible,
  setVisible,
  title,
  message,
  isSuccess,
  buttonText = 'Back',
  backButton,
  buttonContainerSyle = {},
}) => {
  let timer: any
  const onAnimationEnd = () => {
    timer = setTimeout(() => {
      backButton && backButton()
    }, 3000)
    return () => clearTimeout(timer)
  }
  return (
    <CustomModal visible={visible}>
      <Text maxFontSizeMultiplier={1.4} style={styles.title}>
        {title}
      </Text>
      {message && (
        <Text maxFontSizeMultiplier={1.4} style={styles.description}>
          {message}
        </Text>
      )}
      {/* {isSuccess && (
        <LottieView
          style={styles.loader}
          source={loader.SUCCESS}
          autoPlay
          loop={false}
          onAnimationFinish={onAnimationEnd}
        />
      )} */}
      <CustomButton
        title={buttonText}
        testID="buttons/back"
        onPress={() => {
          backButton?.()
          setVisible()
        }}
        activeOpacity={0.7}
        buttonStyle={buttonContainerSyle}
        textStyle={styles.buttonTextStyle}
      />
    </CustomModal>
  )
}

export default CustomInfoModal
