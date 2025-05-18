import colors from '@src/constants/colors'
import React, { FC, useState } from 'react'
import { Pressable, Text, View, TextInput } from 'react-native'

import styles from './styles'

const CustomTextInput: FC<ICustomTextInput> = ({
  containerViewStyle = {},
  inputTitle = '',
  inputTitleStyle = {},
  isPassword = false,
  inputStyle = {},
  returnKeyType = 'default',
  ...rest
}) => {
  const [showPassword, setshowPassword] = useState(isPassword)
  const secureEntry = () => {
    setshowPassword(!showPassword)
  }

  return (
    <View testID="inputFields" style={{ ...styles.mainContainer, ...containerViewStyle }}>
      {inputTitle && (
        <Text maxFontSizeMultiplier={1.4} style={{ ...styles.inputText, ...inputTitleStyle }}>
          {inputTitle}
        </Text>
      )}
      <View style={isPassword ? { ...styles.passwordContainer } : {}}>
        <View style={styles.inputContainer}>
          <TextInput
            maxFontSizeMultiplier={1.4}
            style={{
              ...styles.input2,
              ...inputStyle,
              width: '100%',
            }}
            underlineColorAndroid="rgba(0,0,0,0)"
            secureTextEntry={showPassword}
            placeholderTextColor={colors.BUTTON}
            {...rest}
          />
        </View>
        {isPassword && (
          <View style={styles.eye} testID="pressView">
            <Pressable onPress={secureEntry} style={styles.eyePress}>
              {/* {showPassword ? (
                // <EyeOff color={colors.DROP_DOWN_PICKER_TEXT} size={19} />
              ): (
                  // <Eye color={colors.DROP_DOWN_PICKER_TEXT} size={19} />
                )} */}
            </Pressable>
          </View>
        )}
      </View>
    </View>
  )
}

export default CustomTextInput
