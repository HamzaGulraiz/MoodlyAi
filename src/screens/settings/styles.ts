import { AlignItemType, AlignSelfType, FontWeight, JustifyContentType } from '@src/@types/enum'
import colors from '@src/constants/colors'
import fontSize from '@src/constants/fontSize'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBorder: {
    width: 115,
    height: 115,
    borderRadius: 60,
    justifyContent: JustifyContentType.Center,
    alignItems: AlignItemType.Center,
    alignSelf: AlignSelfType.Center,
    elevation: 1,
    position: 'absolute',
    top: -75,
  },
  imgInnerBorder: {
    width: 115,
    height: 115,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    borderWidth: 4,
    borderRadius: 60,
    borderColor: colors.HEADER,
  },
  cardContainerStyle: {
    paddingHorizontal: 25,
    display: 'flex',
    gap: 20,
    marginTop: 50,
  },

  birthDateContainer: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  birthDateText: { fontSize: fontSize.LARGE, color: colors.BLACK },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: JustifyContentType.SpaceBetween,
    color: colors.BLACK,
  },
  textInput: {
    height: 50,
    width: '100%',
    color: colors.HEADER,
    borderWidth: 1,
    borderColor: colors.BLACK,
    borderRadius: 10,
    marginTop: 4,
    paddingHorizontal: 10,
  },
  error: {
    color: colors.RED,
    fontWeight: FontWeight.W400,
    marginHorizontal: 6.1,
  },
})
