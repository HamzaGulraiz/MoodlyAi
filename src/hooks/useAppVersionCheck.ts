import { ANDROID_PACKAGE } from '@src/constants/common'
import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'

const useAppVersionCheck = () => {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState<boolean>(false)
  const [latestVersion, setLatestVersion] = useState<string | null>(null)

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const fetechedLatestVersion = await fetchLatestAppVersion()
        setLatestVersion(fetechedLatestVersion)

        const currentVersion = DeviceInfo.getVersion()
        if (isOutdated(currentVersion, fetechedLatestVersion ?? currentVersion)) {
          setIsUpdateAvailable(true)
        }
      } catch (error) {}
    }

    checkForUpdates()
  }, [])

  const fetchLatestAppVersion = async (): Promise<string | null> => {
    const platform = Platform.OS

    if (platform === 'android') {
      const url = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}&hl=en&gl=US`
      const response = await fetch(url)
      const html = await response.text()
      const match = html.match(/Current Version.*?>([\d.]+)<\/span>/)
      return match ? match[1] : null
    }

    if (platform === 'ios') {
      // const url = `https://itunes.apple.com/lookup?id=${IOS_APP_ID}`
      // const response = await fetch(url)
      // const data = await response.json()
      // return data.results?.[0]?.version || null
    }

    return null
  }

  const isOutdated = (currentVersion: string, latestVersion: string): boolean => {
    if (!latestVersion) return false

    const currentParts = currentVersion.split('.').map(Number)
    const latestParts = latestVersion.split('.').map(Number)

    for (let i = 0; i < Math.max(currentParts.length, latestParts.length); i++) {
      const current = currentParts[i] || 0
      const latest = latestParts[i] || 0

      if (current < latest) return true
      if (current > latest) return false
    }

    return false
  }

  return { isUpdateAvailable, latestVersion }
}

export default useAppVersionCheck
