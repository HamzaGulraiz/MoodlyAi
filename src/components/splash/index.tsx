import loader from '@src/assets/loader/loader'
import LottieView from 'lottie-react-native'
import * as React from 'react'
import { View } from 'react-native'
import styles from './styles'

const SplashScreen: React.FC<{ onAnimationEnd: () => void }> = ({ onAnimationEnd }) => {
  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        source={loader.SPLASH_SCREEN}
        loop={false}
        style={{ height: '75%', width: '100%' }}
        resizeMode="contain"
        onAnimationFinish={onAnimationEnd}
      />
    </View>
  )
}

export default SplashScreen
