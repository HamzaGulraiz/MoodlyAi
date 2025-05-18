import React from 'react'
import { Image, Text } from 'react-native'

import styles from './styles'
import icons from '@src/assets/icons/icons'

export const ImageHeader = () => (
  <Image style={styles.logoText} resizeMode="stretch" source={icons.APP_LOGO} />
)
export const TitleHeader = ({ name }: { name: string }) => (
  <Text allowFontScaling={false} style={styles.headerTextStyle} numberOfLines={2}>
    {name}
  </Text>
)
