import {
  AlignItemType,
  AlignSelfType,
  FontWeight,
  JustifyContentType,
  TextAlignType,
} from '@src/@types/enum'
import colors from '@src/constants/colors'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.APP_BACKGROUND,
  },
  linearGradient: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 30,
  },
  loader: {
    width: 100,
    height: 50,
    position: 'absolute',
    // top: -35,
    left: '38%',
    right: '38%',
    justifyContent: AlignItemType.Center,
    alignItems: JustifyContentType.Center,
    zIndex: 5,
  },
  pullIndicator: {
    position: 'absolute',
    // top: -32,
    alignSelf: AlignSelfType.Center,
    zIndex: 5,
    alignItems: JustifyContentType.Center,
  },
  animatedText: {
    fontSize: 16,
    color: colors.BLACK,
    fontWeight: FontWeight.W700,
    textAlign: TextAlignType.Center,
  },
})
