import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'

import { settingSlice } from './features'
import { SETTINGS } from '@src/constants/slices'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: [], //Things you want to persist
  blacklist: [SETTINGS], //Things you don't want to persist
}

const rootReducer = combineReducers({
  settings: settingSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(),
  })
}

export const store = setupStore()
export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
