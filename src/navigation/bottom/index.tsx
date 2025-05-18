import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import colors from '@src/constants/colors'
import React from 'react'
import styles from './styles'
import { HOME, HOME_STACK } from '@src/constants/routes'

import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import icons from '@src/assets/icons/icons'
import Badge from '@src/components/badge'
import {
  BellIcon,
  CircleUserRound,
  HandCoins,
  HomeIcon,
  NotebookText,
  ShoppingBag,
} from 'lucide-react-native'
import HomeStack from '../stack'

const Bottom = createBottomTabNavigator()

const BottomStack = () => {
  const navigation = useNavigation<NavigationProps>()

  const focusedColor = colors.BLACK // Active color
  const unfocusedColor = colors.GREY // Inactive color
  const iconSize = 24 // Icon size

  const HeaderTitle = () => (
    <View style={styles.headerImageStyle}>
      <Image style={styles.logoText} resizeMode="stretch" source={icons.APP_LOGO} />
    </View>
  )

  const HeaderRightIcon = () => (
    <TouchableOpacity
      onPress={() => {
        // navigation.navigate(MERCHANT_SETTINGS)
      }}
      style={styles.headerRightImageStyle}>
      <CircleUserRound size={25} color={colors.WHITE} />
    </TouchableOpacity>
  )
  const HeaderLeftIcon = () => (
    <View style={styles.leftItemContainer}>
      <Text maxFontSizeMultiplier={1.4} style={styles.leftItemText}>
        Hey
      </Text>
    </View>
    // <TouchableOpacity
    //   activeOpacity={0.7}
    //   onPress={() => {

    //   }}
    //   style={styles.notificationIcon}>

    //   <Badge count={1} />
    //   <BellIcon size={25} color={colors.WHITE} />
    // </TouchableOpacity>
  )

  return (
    <Bottom.Navigator
      initialRouteName={HOME_STACK}
      screenOptions={{
        headerShown: false,
        // headerStyle: styles.headerStyle,
        // headerTintColor: colors.WHITE,
        // headerTitleAlign: 'center',
        // tabBarAllowFontScaling: false,
        // headerTitleAllowFontScaling: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
      }}>
      <Bottom.Screen
        name={HOME_STACK}
        component={HomeStack}
        options={({ route }) => ({
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <HomeIcon size={iconSize} color={focused ? focusedColor : unfocusedColor} />
          ),
          tabBarActiveTintColor: focusedColor,
          tabBarInactiveTintColor: unfocusedColor,
          // headerTitle: HeaderTitle,
          // headerRight: HeaderRightIcon,
          // headerLeft: HeaderLeftIcon,
        })}
      />
      {/* <Bottom.Screen
        name={MERCHANT_CHECKOUT}
        component={MerchantCheckout}
        options={({ route }) => ({
          tabBarLabel: 'Checkout',
          tabBarIcon: ({ focused }) => (
            <ShoppingBag size={iconSize} color={focused ? focusedColor : unfocusedColor} />
          ),
          headerTitle: HeaderTitle,
          headerRight: HeaderRightIcon,
          headerLeft: HeaderLeftIcon,

          tabBarActiveTintColor: focusedColor,
          tabBarInactiveTintColor: unfocusedColor,
        })}
      />
      <Bottom.Screen
        name={MERCHANT_SALES}
        component={MerchantSales}
        options={({ route }) => ({
          tabBarLabel: 'Sales',
          tabBarIcon: ({ focused }) => (
            <NotebookText size={iconSize} color={focused ? focusedColor : unfocusedColor} />
          ),
          headerTitle: HeaderTitle,
          headerRight: HeaderRightIcon,
          headerLeft: HeaderLeftIcon,

          tabBarActiveTintColor: focusedColor,
          tabBarInactiveTintColor: unfocusedColor,
        })}
      />
      <Bottom.Screen
        name={MERCHANT_PAYOUTS}
        component={MerchantPayouts}
        options={({ route }) => ({
          tabBarLabel: 'Payouts',
          tabBarIcon: ({ focused }) => (
            <HandCoins size={iconSize} color={focused ? focusedColor : unfocusedColor} />
          ),
          headerTitle: HeaderTitle,
          headerRight: HeaderRightIcon,
          headerLeft: HeaderLeftIcon,

          tabBarActiveTintColor: focusedColor,
          tabBarInactiveTintColor: unfocusedColor,
        })}
      /> */}
    </Bottom.Navigator>
  )
}

export default BottomStack
