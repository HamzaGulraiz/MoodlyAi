import { ICustomButtonProps } from '@src/@types/button'
import styles from '@src/components/button/style'
import colors from '@src/constants/colors'
import React, { FC } from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'

const CustomButton: FC<ICustomButtonProps> = ({
  title,
  loadingMessage = 'Loading',
  isLoading = false,
  activityLoaderColor = 'black',
  onPress,
  testID = 'testId',
  buttonStyle = {},
  textStyle = {},
  disabled = false,
  ...rest
}) => {
  return (
    <TouchableOpacity
      testID={'button'}
      disabled={disabled}
      style={{
        ...styles.button,
        ...buttonStyle,
      }}
      onPress={onPress}
      {...rest}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={'small'} color={colors.WHITE} />
        </View>
      ) : (
        <>
          {title && (
            <View style={styles.titleContainer}>
              <Text
                maxFontSizeMultiplier={1.4}
                testID="titleText"
                style={{
                  ...styles.text,
                  ...textStyle,
                }}>
                {isLoading ? loadingMessage : title}
              </Text>
            </View>
          )}
        </>
      )}
    </TouchableOpacity>
  )
}

export default CustomButton
