import { useFocusEffect, useRoute } from '@react-navigation/native'
import { messages } from '@src/constants/messages'
import { HOME } from '@src/constants/routes'
import { useCallback, useState } from 'react'
import { BackHandler } from 'react-native'
export const useBackButtonHandler = () => {
  const [backPressed, setBackPressed] = useState<number>(0)
  const route = useRoute()

  const routesToHandleBackPress = [HOME]

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (routesToHandleBackPress.includes(route.name)) {
          if (backPressed > 0) {
            BackHandler.exitApp()
          } else {
            setBackPressed(backPressed + 1)
            // showToast(messages.PRESS_BACK_AGAIN_TO_EXIT)
            setTimeout(() => setBackPressed(0), 3000)
          }
          return true
        }
      }
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
      return () => {
        backHandler.remove()
      }
    }, [backPressed, setBackPressed])
  )
}
