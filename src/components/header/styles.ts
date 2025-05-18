import { AlignItemType, FontWeight, JustifyContentType } from '@src/@types/enum'
import colors from '@src/constants/colors'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 20,
    justifyContent: JustifyContentType.Center,
    backgroundColor: colors.TRANSPARENT,
  },
  homeContainer: {
    alignItems: AlignItemType.Center,
    justifyContent: JustifyContentType.SpaceBetween,
    flexDirection: 'row',
  },
  homeIconContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },
  homeIcon: {
    height: '100%',
    width: '100%',
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: JustifyContentType.SpaceBetween,
    alignItems: AlignItemType.Center,
  },
  title: {
    fontSize: 18,
    fontWeight: FontWeight.W600,
    color: colors.BLACK,
  },
})
