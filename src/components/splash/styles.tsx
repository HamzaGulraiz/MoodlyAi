import { AlignItemType, JustifyContentType } from '@src/@types/enum'
import colors from '@src/constants/colors'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: AlignItemType.Center,
    justifyContent: JustifyContentType.Center,
  },
})
