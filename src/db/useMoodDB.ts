import SQLite from 'react-native-sqlite-storage'
import { useEffect } from 'react'
import DeviceInfo from 'react-native-device-info'
import { useDispatch } from 'react-redux'
import { setUser } from '@src/redux/features/settings/settingSlice'
import { AccountType } from '@src/@types/enum'

SQLite.enablePromise(true)

const DB_NAME = 'Test.db'
let db: SQLite.SQLiteDatabase

const openDB = async () => {
  try {
    db = await SQLite.openDatabase({ name: DB_NAME, location: 'default' })
    console.log('DB opened')
    return db
  } catch (e) {
    console.error('Failed to open DB', e)
    throw e
  }
}

const createMoodTable = async () => {
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS moods (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mood TEXT NOT NULL,
      note TEXT,
      timestamp TEXT NOT NULL
    )
  `)
}

const createUserTable = async () => {
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      device_id TEXT UNIQUE,
      platform TEXT,
      device_name TEXT,
      device_brand TEXT,
      app_version TEXT,
      profile_pic TEXT,
      username TEXT
      firstName TEXT
      lastName TEXT
      dob TEXT
      email TEXT
      profile_pic TEXT
      accountType TEXT
      country TEXT
    )
  `)
}

const insertUserIfNotExists = async (dispatch: any) => {
  const deviceId = await DeviceInfo.getUniqueId()
  const existing = await db.executeSql('SELECT * FROM users WHERE device_id = ?', [deviceId])

  if (existing[0].rows.length > 0) {
    console.log('User already exists')
    return
  }

  const platform = DeviceInfo.getSystemName()
  const device_name = await DeviceInfo.getDeviceName()
  const device_brand = DeviceInfo.getBrand()
  const app_version = DeviceInfo.getVersion()

  await db.executeSql(
    `INSERT INTO users
    (device_id, platform, device_name, device_brand, app_version, profile_pic, usernamefirstName, lastName, dob, email, profile_pic, accountType, country)
   VALUES (?, ?, ?, ?, ?, null, null, null, null, null, null, null, null)`,
    [deviceId, platform, device_name, device_brand, app_version]
  )
  dispatch(
    setUser({
      firstName: null,
      lastName: null,
      dob: null,
      email: null,
      profile_pic: null,
      username: null,
      accountType: AccountType.Free,
      country: null,
    })
  )
  console.log('New user inserted')
}

const useMoodDB = () => {
  const dispatch = useDispatch()
  const init = async () => {
    await openDB()
    await createUserTable()
    await insertUserIfNotExists(dispatch)
    await createMoodTable()
  }

  const getUser = async () => {
    const deviceId = await DeviceInfo.getUniqueId()
    const result = await db.executeSql('SELECT * FROM users WHERE device_id = ?', [deviceId])
    return result[0].rows.item(0)
  }

  const updateUserProfile = async ({
    username,
    profile_pic,
  }: {
    username?: string
    profile_pic?: string
  }) => {
    const deviceId = await DeviceInfo.getUniqueId()
    if (username) {
      await db.executeSql(`UPDATE users SET username = ? WHERE device_id = ?`, [username, deviceId])
    }
    if (profile_pic) {
      await db.executeSql(`UPDATE users SET profile_pic = ? WHERE device_id = ?`, [
        profile_pic,
        deviceId,
      ])
    }
  }

  const addMood = async (mood: string, note: string) => {
    const timestamp = new Date().toISOString()
    await db.executeSql('INSERT INTO moods (mood, note, timestamp) VALUES (?, ?, ?)', [
      mood,
      note,
      timestamp,
    ])
  }

  const getAllMoods = async (): Promise<MoodEntry[]> => {
    const results = await db.executeSql('SELECT * FROM moods ORDER BY timestamp DESC')
    const rows = results[0].rows
    const moods: MoodEntry[] = []
    for (let i = 0; i < rows.length; i++) {
      moods.push(rows.item(i))
    }
    return moods
  }

  const deleteMood = async (id: number) => {
    await db.executeSql('DELETE FROM moods WHERE id = ?', [id])
  }

  return {
    init,
    getUser,
    updateUserProfile,
    addMood,
    getAllMoods,
    deleteMood,
  }
}

export interface MoodEntry {
  id: number
  mood: string
  note: string | null
  timestamp: string
}

export default useMoodDB
