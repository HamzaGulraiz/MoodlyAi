import { useNavigation } from '@react-navigation/native'
import SplashScreen from '@src/components/splash'
import React, { useEffect, useState } from 'react'
import useAppVersionCheck from '@src/hooks/useAppVersionCheck'
import AppUpdateModal from '@src/components/modal/appUpdateModal'
import NetInfo from '@react-native-community/netinfo'
import BottomStack from './bottom'
import useMoodDB from '@src/db/useMoodDB'

const Root = () => {
  const navigation = useNavigation<NavigationProps>()
  const { isUpdateAvailable, latestVersion } = useAppVersionCheck()
  const { init } = useMoodDB()
  const [customSplashScreen, setCustomSplashScreen] = useState(true)
  const [appUpdateModalVisible, setAppUpdateModalVisible] = useState(false)

  useEffect(() => {
    if (isUpdateAvailable) {
      setAppUpdateModalVisible(true)
    } else {
      setAppUpdateModalVisible(false)
    }
  }, [isUpdateAvailable])

  useEffect(() => {
    const subscription = NetInfo.addEventListener((state: any) => {
      if (!state.isConnected) {
        // No internet at all
      } else {
        let isUnstable = false
        if (state.type === 'wifi' && state.details?.strength !== undefined) {
          // Check WiFi strength (0-100)
          isUnstable = state.details.strength < 30 // Consider weak if strength is below 30
        } else if (state.type === 'cellular' && state.details?.cellularGeneration) {
          // Check mobile data strength (2G, 3G, 4G, 5G)
          const weakCellular = ['2g', '3g'].includes(state.details.cellularGeneration)
          isUnstable = weakCellular
        }

        if (isUnstable) {
        } else {
        }
      }
    })

    return () => subscription()
  }, [])
  useEffect(() => {
    const initialize = async () => {
      await init()
    }
    initialize()
  }, [])

  return (
    <>
      {appUpdateModalVisible && (
        <AppUpdateModal visible={appUpdateModalVisible} latestVersion={latestVersion ?? ''} />
      )}
      {customSplashScreen ? (
        <SplashScreen
          onAnimationEnd={() => {
            setCustomSplashScreen(false)
          }}
        />
      ) : (
        <BottomStack />
      )}
    </>
  )
}

export default Root
