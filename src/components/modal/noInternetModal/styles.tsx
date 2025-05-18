import { FontWeight, TextAlignType } from '@src/@types/enum'
import colors from '@src/constants/colors'
import fontSize from '@src/constants/fontSize'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.MEDIUM,
    color: colors.BLACK,
    fontWeight: FontWeight.W800,
    textAlign: TextAlignType.Center,
  },
  loader: {
    marginTop: 10,
    width: 150,
    height: 150,
  },
  buttonTextStyle: { fontSize: fontSize.MEDIUM, color: colors.WHITE, fontWeight: FontWeight.W400 },
})

export default styles
