import { AlignItemType, JustifyContentType } from '@src/@types/enum'
import colors from '@src/constants/colors'
import fontSize from '@src/constants/fontSize'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Badge = ({ count }: IBadgeProps) => {
  return (
    <>
      {count > 0 && (
        <View
          style={{
            ...styles.badgeStyles,
            width: count < 10 ? 20 : 30,
          }}>
          <Text allowFontScaling={false} style={styles.badgeTextStyles}>
            {count < 10 ? count : `10+`}
          </Text>
        </View>
      )}
    </>
  )
}

export default Badge

const styles = StyleSheet.create({
  badgeStyles: {
    zIndex: 1,
    position: 'absolute',
    left: 12,
    bottom: 14,
    backgroundColor: colors.RED,
    height: 20,
    borderRadius: 10,
    justifyContent: JustifyContentType.Center,
    alignItems: AlignItemType.Center,
  },
  badgeTextStyles: {
    color: colors.WHITE,
    fontSize: fontSize.SMALL,
  },
})
