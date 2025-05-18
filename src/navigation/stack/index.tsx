/* eslint-disable prettier/prettier */
/* eslint-disable no-constant-condition */

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HOME, SETTINGS } from '@src/constants/routes'
import React from 'react'
import { Home, Settings } from '@src/screens'

const RootStack = createNativeStackNavigator()
const HomeStack = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen key={1} name={HOME} component={Home} />
      <RootStack.Screen key={2} name={SETTINGS} component={Settings} />
    </RootStack.Navigator>
  )
}
export default HomeStack
