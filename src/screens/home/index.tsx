import { Text, View } from 'react-native'
import React, { useState } from 'react'
import Background from '@src/components/background'
import { useNavigation } from '@react-navigation/native'
import { styles } from './styles'
import Header from '@src/components/header'

const Home = () => {
  const navigation = useNavigation<NavigationProps>()
  const [refresh, setRefresh] = useState(false)
  return (
    <Background
      useLinear
      refreshing={refresh}
      onRefresh={() => {
        setRefresh(true)
        setTimeout(() => {
          setRefresh(false)
        }, 3000)
      }}>
      <Header home />
      <View style={styles.container}>
        <Text>Home</Text>
      </View>
    </Background>
  )
}

export default Home
