import { AlignItemType, FontWeight, JustifyContentType, TextAlignType } from '@src/@types/enum'
import fontSize from '@src/constants/fontSize'
import { Platform, StatusBar, StyleSheet } from 'react-native'

import colors from '../../constants/colors'

export default StyleSheet.create({
  img: { width: 22, height: 22 },

  headerImageStyle: {
    width: '100%',
    backgroundColor: colors.HEADER,
    justifyContent: JustifyContentType.Center,
    alignItems: AlignItemType.Center,
  },
  headerRightImageStyle: {
    marginRight: 10,
  },
  logoText: { width: 45, height: 25 },
  headerTextStyle: {
    textAlign: TextAlignType.Center,
    color: colors.WHITE,
    fontWeight: FontWeight.Bold,
    fontSize: fontSize.LARGE,
  },
  drawerItemStyle: {
    marginLeft: 10,
    marginVertical: 1,
  },
  headerStyle: {
    backgroundColor: colors.APP_BACKGROUND,
  },
  drawerLabelStyle: {
    marginLeft: -10,
    fontSize: fontSize.MEDIUM,
    color: colors.BLACK,
  },
  tabBarStyle: {
    height: Platform.OS === 'android' ? 70 : 80,
    paddingBottom: 10,
    paddingTop: Platform.OS === 'android' ? 8 : 6,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: FontWeight.W400,
  },
  leftItemContainer: {},
  leftItemText: {
    fontSize: 12,
    fontWeight: FontWeight.W400,
  },
  notificationIcon: {
    marginLeft: 10,
    alignItems: AlignItemType.Center,
    justifyContent: JustifyContentType.Center,
  },
})
