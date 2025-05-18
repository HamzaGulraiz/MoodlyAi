import dayjs from 'dayjs'
import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useCalendarContext } from '../CalendarContext'
import { getDate, getFormated } from '../utils'

const TimeSelector = () => {
  const {
    selectedDateTo,
    selectedDate,
    currentDate,
    onSelectDateTo,
    onSelectDate,
    currentTime,
    onChangeTime,
  } = useCalendarContext()
  const handleTimeChange = (time: any) => {
    onChangeTime(new Date(time))
    const parsedTime = dayjs(time)
    const hours = parsedTime.hour()
    const minutes = parsedTime.minute()
    const newDate = getDate(selectedDate ? selectedDate : currentDate)
      .hour(hours)
      .minute(minutes)
    const newDateTo = getDate(selectedDateTo ? selectedDateTo : currentDate)
      .hour(hours)
      .minute(minutes)
    onSelectDate(getFormated(newDate))
    onSelectDateTo(getFormated(newDateTo), selectedDate)
  }
  return <View style={styles.container} testID="time-selector"></View>
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
})

export default TimeSelector
