import * as yup from 'yup'
import { validations } from './messages'

const signInValidationSchema = yup.object().shape({
  // mobileNumber: yup
  //   .string()
  //   .matches(PHONE_REG_EXP, validations.PHONE_NUMBER_IS_NOT_VALID)
  //   .required(validations.PHONE_NUMBER_IS_REQUIRED),
  // country_code: yup.string().matches(/5999/, validations.COUNTRY_IS_NOT_VALID),
  // password: yup.string().required(validations.PASSWORD_REQUIRED),
})

const updateProfileValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3, validations.FIRST_NAME_MIN)
    .max(50, validations.FIRST_NAME_MAX)
    .required(validations.FIRST_NAME_REQ),
  lastName: yup
    .string()
    .min(2, validations.LAST_NAME_MIN)
    .max(50, validations.LAST_NAME_MAX)
    .required(validations.LAST_NAME_REQ),
  birthDate: yup.string().required(validations.DATE_OF_BIRTH_IS_REQUIRED),
  email: yup
    .string()
    .email(validations.PLEASE_ENTER_VALID_EMAIL)
    .required(validations.EMAIL_ADDRESS_IS_REQUIRED),
})

export { signInValidationSchema, updateProfileValidationSchema }
