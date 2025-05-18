import { FormikErrors } from 'formik'
import { Alert, Dimensions, Linking, Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions'

import ReactNativeHapticFeedback, { HapticFeedbackTypes } from 'react-native-haptic-feedback'
import Clipboard from '@react-native-clipboard/clipboard'
import axios from 'axios'

const { fontScale, height, scale, width } = Dimensions.get('screen')

const IOS_PADDING = 20

const copyToClipboard = (value: string) => {
  Clipboard.setString(value)
}

const minimumDate = (year: number = 100) => {
  const today = new Date()
  const minDate = new Date()
  const newDate = new Date(minDate.setFullYear(today.getFullYear() - year))
  return newDate
}
const maximumDate = (year: number = 100) => {
  const today = new Date()
  const minDate = new Date()
  return minDate.setFullYear(today.getFullYear() + year)
}

const getValidationErrors = (errors: FormikErrors<any>, values: any, isDirty: boolean) => {
  const keys = Object.keys(errors)
  let str = ''
  keys.forEach((key) => {
    if (isDirty && !!(values as any)[key]) {
      str += '* ' + (errors as any)[key] + '\n'
    } else if (key === 'terms') {
      str += '* ' + (errors as any)[key] + '\n'
    }
  })
  return str
}

const handleConversion = (output: any) => {
  const selectedDate = new Date(output)
  const formattedDate =
    selectedDate.getFullYear().toString() +
    '-' +
    (selectedDate.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    selectedDate.getDate().toString().padStart(2, '0')

  // Check if user is 18+
  const today = new Date()
  const age = today.getFullYear() - selectedDate.getFullYear()
  const isAdult =
    age > 18 ||
    (age === 18 &&
      (today.getMonth() > selectedDate.getMonth() ||
        (today.getMonth() === selectedDate.getMonth() &&
          today.getDate() >= selectedDate.getDate())))

  return { formattedDate, isAdult }
}

const getVersionNumber = async () => {
  let version = DeviceInfo.getVersion() // Get the version string
  version = version.split('.')[0]
  const versionNumber = parseFloat(version)
  return versionNumber
}

const validateImageUri = (uri: string): boolean => {
  // Regular expression to validate URL format
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)' + // Protocol (http or https)
      '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // Domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
      '(\\:\\d+)?' + // Port
      '(\\/[-a-zA-Z\\d%_.~+]*)*' + // Path
      '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // Query string
      '(\\#[-a-zA-Z\\d_]*)?$' // Fragment locator
  )

  if (!urlPattern.test(uri)) {
    return false
  }

  // Validate image file extensions
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg']
  const uriLower = uri.toLowerCase()

  for (const ext of imageExtensions) {
    if (uriLower.endsWith(ext)) {
      return true
    }
  }

  return false
}

const getAxiosError = (error: unknown): IAxiosErrorProps => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return error.response.data.message
        ? error.response.data
        : ({
            message: 'An error occurred',
            output: null,
            responseCode: error.response.status,
            success: false,
          } as IAxiosErrorProps)
    }
  }
  return { message: 'An error occurred', output: null, responseCode: 500, success: false }
}

const hapticNotify = (type: HapticFeedbackTypes) => {
  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  }

  try {
    // Trigger haptic feedback
    ReactNativeHapticFeedback.trigger(type, options)
  } catch (error) {}
}

const openAppSettings = () => {
  Alert.alert(
    'Permission Required',
    'Please allow camera and gallery access in settings to upload images.',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open Settings', onPress: () => Linking.openSettings() },
    ]
  )
}

const checkPermission = async (type: 'camera' | 'gallery') => {
  const permission =
    Platform.OS === 'ios'
      ? type === 'camera'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.IOS.PHOTO_LIBRARY
      : type === 'camera'
      ? PERMISSIONS.ANDROID.CAMERA
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE

  const result = await check(permission)

  if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) return true
  if (result === RESULTS.DENIED) {
    const newResult = await request(permission)
    return newResult === RESULTS.GRANTED || newResult === RESULTS.LIMITED
  }
  if (result === RESULTS.BLOCKED) {
    openAppSettings()
  }
  return false
}

const getTimeInfo = (): ITimeInfo => {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()

  // Format date
  const date = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Format time (24hr)
  const time = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`

  // Determine time of day
  let timeOfDay: ITimeInfo['timeOfDay'] = 'Good Morning'

  if (hours >= 5 && hours < 12) {
    timeOfDay = 'Good Morning'
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = 'Good Afternoon'
  } else if (hours >= 17 && hours < 21) {
    timeOfDay = 'Good Evening'
  } else {
    timeOfDay = 'Night Time' // includes 21:00 to 4:59
  }

  return {
    date,
    time,
    timeOfDay,
  }
}

export {
  checkPermission,
  hapticNotify,
  getAxiosError,
  validateImageUri,
  getVersionNumber,
  handleConversion,
  minimumDate,
  maximumDate,
  getValidationErrors,
  copyToClipboard,
  getTimeInfo,
  fontScale,
  height,
  scale,
  width,
  IOS_PADDING,
}
