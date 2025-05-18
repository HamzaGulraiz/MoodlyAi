import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { styles } from './styles'
import { getTimeInfo } from '@src/helper/helper'
import icons from '@src/assets/icons/icons'
import { useNavigation } from '@react-navigation/native'
import { SETTINGS } from '@src/constants/routes'
import { ChevronLeft } from 'lucide-react-native'
import colors from '@src/constants/colors'

const Header: React.FC<HeaderProps> = ({
  settings,
  home,
  title,
  showBack = false,
  onBackPress,
  rightIcon,
}) => {
  const navigation = useNavigation<NavigationProps>()
  const { timeOfDay } = getTimeInfo()
  return (
    <View style={styles.container}>
      {home && (
        <View style={styles.homeContainer}>
          <Text allowFontScaling={false} style={styles.title}>
            Hey, {timeOfDay}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(SETTINGS)
            }}
            style={styles.homeIconContainer}>
            <Image resizeMode="contain" style={styles.homeIcon} source={icons.DUMMY_PIC} />
          </TouchableOpacity>
        </View>
      )}
      {settings && (
        <View style={styles.homeContainer}>
          {showBack ? (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack()
              }}
              style={styles.iconContainer}>
              <ChevronLeft size={24} color={colors.BLACK} />
            </TouchableOpacity>
          ) : (
            <View style={styles.iconContainer} />
          )}

          <Text style={styles.title}>{title}</Text>

          <View style={styles.iconContainer}>{rightIcon}</View>
        </View>
      )}
    </View>
  )
}

export default Header
