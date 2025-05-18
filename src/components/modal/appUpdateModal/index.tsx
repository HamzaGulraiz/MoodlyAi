import CustomButton from '@src/components/button'
import CustomModal from '@src/components/modal/index'
import React, { FC } from 'react'
import { Text, Linking, Platform } from 'react-native'

import styles from './styles'
import { ANDROID_PACKAGE } from '@src/constants/common'
import { IAppVersionModal } from '@src/@types/modals'

const AppUpdateModal: FC<IAppVersionModal> = ({ visible, latestVersion = '' }) => {
  const handleOpenStore = () => {
    const storeUrl =
      Platform.OS === 'android'
        ? `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`
        : `https://apps.apple.com/app/id123`
    Linking.openURL(storeUrl)
  }

  return (
    <CustomModal visible={visible} containerStyle={{ width: '80%' }}>
      <>
        <Text maxFontSizeMultiplier={1.4} style={styles.title}>
          Update Available{' '}
        </Text>
        <Text maxFontSizeMultiplier={1.4} style={styles.description}>
          A new version of the app is available v-{`${latestVersion}`}. Please update to continue.
        </Text>
        <CustomButton
          title={Platform.OS === 'android' ? 'Open Play Store' : 'Open App Store'}
          testID="settingbtn"
          onPress={handleOpenStore}
          activeOpacity={0.7}
          buttonStyle={{}}
          textStyle={styles.buttonTextStyle}
        />
      </>
    </CustomModal>
  )
}

export default AppUpdateModal
