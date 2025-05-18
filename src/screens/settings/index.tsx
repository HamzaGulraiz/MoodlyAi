import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Background from '@src/components/background'
import { useNavigation } from '@react-navigation/native'
import { styles } from './styles'
import Header from '@src/components/header'
import UploadImageBottomSheet from '@src/components/bottomSheet/uploadImageBottomSheet'
import { checkPermission, getValidationErrors, validateImageUri } from '@src/helper/helper'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { useAppSelector } from '@src/redux/hooks'
import { Formik } from 'formik'
import { updateProfileValidationSchema } from '@src/constants/validations'
import Card from '@src/components/Card'
import icons from '@src/assets/icons/icons'
import colors from '@src/constants/colors'
import { CameraIcon } from 'lucide-react-native'
import CustomTextInput from '@src/components/textInput'
import { messages } from '@src/constants/messages'
import { KeyboardTypeEnum } from '@src/@types/enum'

const Settings = () => {
  const navigation = useNavigation<NavigationProps>()
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const { user } = useAppSelector((state) => state.settings)
  const onSubmit = async (values: any, { setErrors }: any) => {}

  const handleImageUpload = async (source: 'camera' | 'gallery' | 'delete', index?: number) => {
    if (source === 'delete' && index !== undefined) {
      onDelete()
    } else if (source === 'camera' || source === 'gallery') {
      const hasPermission = await checkPermission(source)
      setIsBottomSheetOpen(false)
      if (!hasPermission) return
      const options: any = { mediaType: 'photo', quality: 1, includeBase64: true }
      const result =
        source === 'camera' ? await launchCamera(options) : await launchImageLibrary(options)
      if (result.assets && result.assets[0].uri) {
        const uri = result.assets[0].uri
        sendAvatar(uri)
      } else {
        // handleModalClose(Modals.LoaderModal, dispatch)
      }
    }
  }

  const sendAvatar = async (uri: any) => {
    // dispatch(openModal(modalContent.ACTIVITY_LOADER))
    // try {
    //   let data = {
    //     picture: base64,
    //   }
    //   const res = await apiService.uploadAvatar(data)
    //   if (res.success) {
    //     await fetchUserData()
    //     handleModalClose(Modals.LoaderModal, dispatch)
    //     setIsBottomSheetOpen(false)
    //   }
    // } catch (error: unknown) {
    //   const { message } = getAxiosError(error)
    //   handleModalClose(Modals.LoaderModal, dispatch)
    //   setIsBottomSheetOpen(false)
    //   dispatch(
    //     openModal(
    //       modalContent.INFO({
    //         title: 'CHIP',
    //         message: message,
    //         isSuccess: false,
    //         buttonText: 'Go back',
    //       }),
    //     ),
    //   )
    // }
  }

  const onConfirmDelete = async () => {
    // dispatch(openModal(modalContent.ACTIVITY_LOADER))
    // try {
    //   const res = await apiService.deletedAvatar({})
    //   handleModalClose(Modals.LoaderModal, dispatch)
    //   if (res.success) {
    //     await fetchUserData()
    //     setIsBottomSheetOpen(false)
    //   }
    // } catch (error: unknown) {
    //   const { message } = getAxiosError(error)
    //   setIsBottomSheetOpen(false)
    //   handleModalClose(Modals.LoaderModal, dispatch)
    //   dispatch(
    //     openModal(
    //       modalContent.INFO({
    //         title: 'CHIP',
    //         message: message,
    //         isSuccess: false,
    //         buttonText: 'Retry',
    //       }),
    //     ),
    //   )
    // }
  }

  const onDelete = () => {
    setIsBottomSheetOpen(false)
  }

  return (
    <Background useLinear>
      <Header settings />
      <View style={styles.container}>
        <UploadImageBottomSheet
          isBottomSheetOpen={isBottomSheetOpen}
          setIsBottomSheetOpen={() => {
            setIsBottomSheetOpen(false)
          }}
          onCamera={() => {
            setIsBottomSheetOpen(false)
            setTimeout(() => handleImageUpload('camera'), 500)
          }}
          onGallery={() => {
            setIsBottomSheetOpen(false)
            setTimeout(() => handleImageUpload('gallery'), 500)
          }}
          onDelete={() => {
            setIsBottomSheetOpen(false)
            setTimeout(() => onDelete(), 500)
          }}
        />
        <Formik
          enableReinitialize={true}
          initialValues={{
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            birthDate: user.dob,
          }}
          validateOnMount={updateProfileValidationSchema.__isYupSchema__}
          validationSchema={updateProfileValidationSchema}
          onSubmit={onSubmit}>
          {({ handleChange, values, errors, dirty, handleBlur, setFieldValue }) => (
            <Card
              cardStyle={{
                width: '90%',
                position: 'relative',
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                testID="image-edit"
                onPress={() => {
                  setIsBottomSheetOpen(true)
                }}
                style={styles.imgBorder}>
                <View style={styles.imgInnerBorder}>
                  <Image
                    source={
                      validateImageUri(user?.profile_pic || '')
                        ? { uri: user?.profile_pic }
                        : icons.DUMMY_PIC
                    }
                    style={styles.img}
                  />
                </View>
                <View
                  style={{
                    position: 'absolute',
                    right: 2,
                    bottom: 10,
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                    backgroundColor: colors.HEADER,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CameraIcon size={20} color={colors.WHITE} />
                </View>
              </TouchableOpacity>
              <View style={styles.cardContainerStyle}>
                <CustomTextInput
                  inputTitle={
                    values.firstName && errors.firstName
                      ? `${messages.FIRST_NAME}*`
                      : messages.FIRST_NAME
                  }
                  inputTitleStyle={
                    values.firstName && errors.firstName ? { color: colors.RED } : {}
                  }
                  placeholder="John"
                  inputStyle={{ color: colors.HEADER }}
                  value={values.firstName}
                  onBlur={handleBlur('firstName')}
                  onChangeText={handleChange('firstName')}
                  keyboardType={KeyboardTypeEnum.EmailAddress}
                  editable={false}
                />
                <CustomTextInput
                  inputTitle={
                    values.lastName && errors.lastName
                      ? `${messages.LAST_NAME}*`
                      : messages.LAST_NAME
                  }
                  inputTitleStyle={values.lastName && errors.lastName ? { color: colors.RED } : {}}
                  placeholder="Doe"
                  inputStyle={{ color: colors.HEADER }}
                  value={values.lastName}
                  onBlur={handleBlur('lastName')}
                  onChangeText={handleChange('lastName')}
                  keyboardType={KeyboardTypeEnum.EmailAddress}
                  editable={false}
                />
                <CustomTextInput
                  inputTitle={values.email && errors.email ? `${messages.EMAIL}*` : messages.EMAIL}
                  inputTitleStyle={values.email && errors.email ? { color: colors.RED } : {}}
                  value={values.email}
                  inputStyle={{ color: colors.HEADER }}
                  placeholder="john@gmail.com"
                  onBlur={handleBlur('email')}
                  onChangeText={handleChange('email')}
                  keyboardType={KeyboardTypeEnum.EmailAddress}
                  editable={false}
                />
                <View style={styles.birthDateContainer}>
                  <Text maxFontSizeMultiplier={1.4} style={styles.birthDateText}>
                    Birth Date
                  </Text>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      maxFontSizeMultiplier={1.4}
                      placeholder={'Select date'}
                      style={styles.textInput}
                      editable={false}
                      value={values.birthDate}
                    />
                  </View>
                </View>
                <Text maxFontSizeMultiplier={1.4} style={styles.error}>
                  {getValidationErrors(errors, values, dirty)}
                </Text>
              </View>
            </Card>
          )}
        </Formik>
      </View>
    </Background>
  )
}

export default Settings
