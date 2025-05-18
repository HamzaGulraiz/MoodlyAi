interface IUserProps {
  profile_pic: stirng | null
  email: stirng | null
  firstName: stirng | null
  lastName: stirng | null
  dob: stirng | null
  username: stirng | null
  accountType: AccountType
  country: string | null
}

interface ISettingSlice {
  user: IUserProps
  token: string | null
}
