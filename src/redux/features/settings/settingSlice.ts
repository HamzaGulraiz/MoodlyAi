import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AccountType } from '@src/@types/enum'
import { SETTINGS } from '@src/constants/slices'

const initialState: ISettingSlice = {
  user: {
    firstName: null,
    lastName: null,
    dob: null,
    email: null,
    profile_pic: null,
    username: null,
    accountType: AccountType.Free,
    country: null,
  },
  token: null,
}

const settingsSlice = createSlice({
  name: SETTINGS,
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUserProps>) {
      state.user = action.payload
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload
    },
    resetSettingsState: () => initialState,
  },
})

export const { resetSettingsState, setUser } = settingsSlice.actions
export default settingsSlice.reducer
