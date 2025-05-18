/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import Root from './src/navigation'
import { NotifierWrapper } from 'react-native-notifier'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated'
import { enableScreens } from 'react-native-screens'
import { StatusBar } from 'react-native'
import { StatusBarStyle } from '@src/@types/enum'
import colors from '@src/constants/colors'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { persistor, store } from './src/redux/store'

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
}

const linking = {
  prefixes: ['chip://'],
  config: {
    screens: {},
  },
}

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
})

enableScreens(false)

export const navigationRef = React.createRef<any>()
export default function App() {
  return (
    <GestureHandlerRootView>
      <StatusBar barStyle={StatusBarStyle.dark} backgroundColor={colors.APP_BACKGROUND} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NotifierWrapper>
            <NavigationContainer theme={MyTheme} linking={linking} ref={navigationRef}>
              <Root />
            </NavigationContainer>
          </NotifierWrapper>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  )
}
