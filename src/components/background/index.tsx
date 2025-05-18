import { ICustomBackGroundProps } from '@src/@types/background'
import { StatusBarStyle } from '@src/@types/enum'
import colors from '@src/constants/colors'
import { FC, useRef } from 'react'
import React, { View, SafeAreaView, ScrollView, Animated, PanResponder, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import { hapticNotify } from '@src/helper/helper'
import { HapticFeedbackTypes } from 'react-native-haptic-feedback'
import loader from '@src/assets/loader/loader'
import LottieView from 'lottie-react-native'

const Background: FC<ICustomBackGroundProps> = ({
  children,
  avoidKeyboard = false,
  showsVerticalScrollIndicator = false,
  useLinear = false,
  refreshing = false,
  onRefresh,
}) => {
  const Container = avoidKeyboard ? KeyboardAwareScrollView : SafeAreaView
  const scrollY = useRef(new Animated.Value(0)).current
  const scrolling = useRef(false)
  // Add spring configuration for smoother animation
  const springConfig = {
    tension: 40,
    friction: 7,
    useNativeDriver: false,
  }
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        if (scrolling.current) {
          return
        }
        if (gestureState.dy > 0 && !refreshing) {
          // Add dampening effect for smoother pull
          const dampedDy = Math.min(gestureState.dy * 0.7, 80)
          scrollY.setValue(dampedDy)
        }
      },
      onPanResponderRelease: (event, gestureState) => {
        if (scrolling.current) {
          return
        }
        if (gestureState.dy > 50 && !refreshing) {
          onRefresh && onRefresh()
          hapticNotify(HapticFeedbackTypes.impactLight)
          // Animate to the refresh position smoothly
          Animated.spring(scrollY, {
            toValue: 30,
            ...springConfig,
          }).start()
        } else {
          // Animate back to start position with spring physics
          Animated.spring(scrollY, {
            toValue: 0,
            ...springConfig,
          }).start()
        }
      },
    })
  ).current
  const translateY = scrollY.interpolate({
    inputRange: [0, 40, 80], // adding a midpoint
    outputRange: [0, 25, 40], // making the movement non-linear
    extrapolate: 'clamp',
  })
  const pullIndicatorOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })
  const pullIndicatorSize = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [10, 25],
    extrapolate: 'clamp',
  })
  const renderCustomRefreshIndicator = () => {
    if (refreshing) {
      // Use spring animation when transitioning to refreshing state
      Animated.spring(scrollY, {
        toValue: 0,
        ...springConfig,
      }).start()
      return <LottieView autoPlay style={styles.loader} source={loader.SPLASH_SCREEN} />
    }
    return (
      // Add pull indicator image that fades in based on pull progress
      <Animated.Text
        style={[
          styles.pullIndicator,
          {
            opacity: refreshing ? 0 : pullIndicatorOpacity,
            width: 200,
            // width: pullIndicatorSize,
            height: pullIndicatorSize,
          },
        ]}>
        <Text allowFontScaling={false} style={styles.animatedText}>
          MoodlyAi
        </Text>
      </Animated.Text>
    )
  }

  const content = (
    <View style={styles.wrapper}>
      {onRefresh && refreshing ? (
        <Animated.View
          style={{
            transform: [{ translateY }],
            backfaceVisibility: 'hidden',
          }}
          {...panResponder.panHandlers}>
          {renderCustomRefreshIndicator()}
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            onScroll={(event) => {
              scrolling.current = event.nativeEvent.contentOffset.y >= 1
            }}
            scrollEventThrottle={16} // Improve scroll performance
            nestedScrollEnabled={true}
            contentContainerStyle={styles.contentContainer}>
            {children}
          </ScrollView>
        </Animated.View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          contentContainerStyle={styles.contentContainer}>
          {children}
        </ScrollView>
      )}
    </View>
  )
  return (
    <Container
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      bounces={false}
      contentContainerStyle={styles.mainContainer}
      style={styles.mainContainer}>
      {useLinear ? (
        <LinearGradient
          colors={colors.BackGroundGradient}
          start={{ x: 0, y: -1 }}
          end={{ x: 0, y: 0.8 }}
          style={styles.linearGradient}>
          {content}
        </LinearGradient>
      ) : (
        content
      )}
    </Container>
  )
}
export default Background
