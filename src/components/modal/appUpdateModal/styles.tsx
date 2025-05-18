import { FontWeight, TextAlignType } from '@src/@types/enum'
import colors from '@src/constants/colors'
import fontSize from '@src/constants/fontSize'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.LARGE,
    color: colors.BLACK,
    fontWeight: FontWeight.W800,
    textAlign: TextAlignType.Center,
  },
  description: {
    marginTop: 20,
    fontSize: fontSize.MEDIUM,
    color: colors.BLACK,
    fontWeight: FontWeight.W500,
    textAlign: TextAlignType.Center,
  },
  buttonTextStyle: { fontSize: fontSize.MEDIUM, color: colors.WHITE, fontWeight: FontWeight.W400 },
})

export default styles
