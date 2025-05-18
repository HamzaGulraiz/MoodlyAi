import icons from '@src/assets/icons/icons'
import React from 'react'
import { Image } from 'react-native'

const AppLogo: React.FC<IAppLogoProps> = ({
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  height = 200,
  width = 200,
  alignSelf = 'auto',
  testID,
}) => {
  return (
    <Image
      testID={testID}
      source={icons.APP_LOGO}
      resizeMode="contain"
      style={{
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginLeft: marginLeft,
        marginRight: marginRight,
        height: height,
        width: width,
        alignSelf,
      }}
    />
  )
}

export default AppLogo
