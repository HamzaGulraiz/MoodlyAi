import colors from '@src/constants/colors'
import fontSize from '@src/constants/fontSize'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  mainContainer: {},
  inputText: {
    fontSize: fontSize.LARGE,
    color: colors.BLACK,
  },
  passwordContainer: {
    flexDirection: 'row',
  },
  inputContainer: {
    width: '100%',
  },
  input2: {
    height: 50,
    fontSize: fontSize.TEXT_BASE,
    color: colors.BLACK,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 0,
    borderWidth: 1,
    borderColor: colors.GREEN,
    textAlignVertical: 'center',
    marginTop: 14,
  },
  eye: {
    position: 'absolute',
    top: 30,
    right: 20,
  },
  eyePress: {},
})

export default styles
