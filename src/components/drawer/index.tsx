import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer'
import colors from '@src/constants/colors'

import React, { useState } from 'react'
import {
  ActivityIndicator,
  Image,
  Linking,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import styles from './styles'

import { validateImageUri } from '@src/helper/helper'

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const { navigation, descriptors } = props
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {}
  const handleLogout = async () => {}

  return (
    <DrawerContentScrollView
      refreshControl={
        <RefreshControl
          // refresh control used for the Pull to Refresh
          testID="refreshControl"
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      <TouchableOpacity
        onPress={() => {
          navigation?.closeDrawer()
        }}>
        <View style={styles.profileContainer}>
          <View style={styles.imgBorder}>
            <View style={styles.imgInnerBorder}>
              {/* <Image
                source={
                  validateImageUri('')
                    ? { uri: '' }
                    : icons.DRAWER_ICON_PROIFLE
                }
                style={styles.img}
              /> */}
            </View>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text maxFontSizeMultiplier={1.4} style={styles.userName}>
              Hello
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.listContainer}>
        <DrawerItemList
          {...props}
          descriptors={Object.fromEntries(
            Object.entries(props.descriptors).map(([key, descriptor]) => [
              key,
              {
                ...descriptor,
                options: {
                  ...descriptor.options,
                  drawerAllowFontScaling: false,
                },
              },
            ])
          )}
        />
        <DrawerItem
          label="LOGOUT"
          testID="logout"
          onPress={handleLogout}
          allowFontScaling={false}
          // icon={() => <LogOutIcon size={25} color={colors.BLACK} />}
          labelStyle={styles.label}
        />
        <View style={styles.social}>
          <TouchableOpacity
            activeOpacity={0.7}
            testID="instagramIcon"
            onPress={() => {
              Linking.openURL('https://www.facebook.com/ChipCuracao/')
            }}>
            {/* <Image style={styles.imggroup} source={icons.DRAWER_ICON_FB} /> */}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            testID="facebookIcon"
            onPress={() => {
              Linking.openURL('https://www.instagram.com/chipcuracao/')
            }}>
            {/* <Image style={styles.imggroup} source={icons.DRAWER_ICON_INSTAGRAM} /> */}
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  )
}

export default CustomDrawer
