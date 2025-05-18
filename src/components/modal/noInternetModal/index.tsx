import loader from '@src/assets/loader/loader'
import CustomButton from '@src/components/button'
import CustomModal from '@src/components/modal/index'
import { messages } from '@src/constants/messages'
import LottieView from 'lottie-react-native'
import React, { FC } from 'react'
import { Text, Linking, Platform } from 'react-native'
import AndroidOpenSettings from 'react-native-android-open-settings'

import styles from './styles'
import { IInternetModal } from '@src/@types/modals'

const CustomNoInternetModal: FC<IInternetModal> = ({ visible, lowInternet }) => {
  const handleOpenSettings = () => {
    Platform.OS === 'ios' ? Linking.openSettings() : AndroidOpenSettings.wifiSettings()
  }

  return (
    <CustomModal visible={visible} containerStyle={{ width: '80%' }}>
      <>
        {lowInternet ? (
          <>
            <Text maxFontSizeMultiplier={1.4} style={styles.title}>
              {messages.WEAK_CONNECTION}
            </Text>
            {/* <LottieView style={styles.loader} source={loader.WEAK_INTERNET} autoPlay loop={false} /> */}
          </>
        ) : (
          <>
            <Text maxFontSizeMultiplier={1.4} style={styles.title}>
              {messages.CONNECTION_ERROR}
            </Text>
            <LottieView style={styles.loader} source={loader.NO_INTERNET} autoPlay loop={false} />
          </>
        )}
        <CustomButton
          title={messages.OPEN_SETTINGS}
          testID="settingbtn"
          onPress={handleOpenSettings}
          activeOpacity={0.7}
          // buttonStyle={buttonStyle.FILLED_SQUARE(200, 10)}
          textStyle={styles.buttonTextStyle}
        />
      </>
    </CustomModal>
  )
}

export default CustomNoInternetModal
