import dayjs from 'dayjs'
import moment from 'moment'

import type { DateType, IDayObject } from './types'

export const CALENDAR_FORMAT = 'YYYY-MM-DD HH:mm'
export const DATE_FORMAT = 'YYYY-MM-DD'
export const YEAR_PAGE_SIZE = 12

export const getMonths = () => dayjs.months()

export const getMonthName = (month: number) => dayjs.months()[month]

export const getWeekdays = () => dayjs.weekdays()

export const getWeekdaysShort = () => dayjs.weekdaysShort()

export const getWeekdaysMin = (firstDayOfWeek: number) => {
  let days = dayjs.weekdaysShort()
  if (firstDayOfWeek > 0) {
    days = [
      ...days.slice(firstDayOfWeek, days.length),
      ...days.slice(0, firstDayOfWeek),
    ] as dayjs.WeekdayNames
  }
  return days
}

export function formatTimeWithAmPm(time: string | number | Date | dayjs.Dayjs | null | undefined) {
  const formattedTime = dayjs(time ?? getFormated(new Date())).format('hh:mm')
  const formattedHour = dayjs(time ? time : getFormated(new Date())).format('HH')
  const hour = parseInt(formattedHour, 10)
  const period = hour >= 12 ? 'PM' : 'AM'
  return {
    formattedTime: formattedTime,
    period: period,
  }
  // if (hour >= 12) {
  //   return `${formattedTime} PM`;
  // } else {
  //   return `${formattedTime} AM`;
  // }
}
export function formatTime(timestamp: number | Date) {
  const formattedTime = dayjs(timestamp).format('hh:mm')
  // const formattedHour = dayjs(timestamp).format('H');
  // const hour = parseInt(formattedHour, 10);
  // const period = hour >= 12 ? 'PM' : 'AM';
  return formattedTime
}

export function timeInNumber(timeString: string) {
  const parsedTime = dayjs(timeString, { format: 'hh:mm' })

  const hour = parsedTime.hour()
  const minutes = parsedTime.minute()
  return { hour, minutes }
}
export function getDateWithOffset(offset: number) {
  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() + offset)
  return currentDate
}

export const swapTime = (
  newDateString: moment.MomentInput,
  currentDateToday: moment.MomentInput
) => {
  const newDate = moment(newDateString)
  const currentTime = moment(currentDateToday, 'YYYY-MM-DD h:mm')

  // Set the time from currentTime to newDate
  newDate.set({
    hour: currentTime.get('hour'),
    minute: currentTime.get('minute'),
    second: currentTime.get('second'),
  })

  return newDate.format('YYYY-MM-DD h:mm')
}

export const getFormated = (date: DateType) => dayjs(date).format(CALENDAR_FORMAT)

export const getDateMonth = (date: DateType) => dayjs(date).month()

export const getDateYear = (date: DateType) => dayjs(date).year()

export const getToday = () => dayjs().format(DATE_FORMAT)

export function areDatesOnSameDay(a: DateType, b: DateType) {
  if (!a || !b) {
    return false
  }

  const date_a = dayjs(a).format(DATE_FORMAT)
  const date_b = dayjs(b).format(DATE_FORMAT)

  return date_a === date_b
}

export const getFormatedDate = (date: DateType, format: string) => dayjs(date).format(format)

export const getDate = (date: DateType) => dayjs(date, CALENDAR_FORMAT)

export const getYearRange = (year: number) => {
  const endYear = YEAR_PAGE_SIZE * Math.ceil(year / YEAR_PAGE_SIZE)
  let startYear = endYear === year ? endYear : endYear - YEAR_PAGE_SIZE

  if (startYear < 0) startYear = 0
  return Array.from({ length: YEAR_PAGE_SIZE }, (_, i) => startYear + i)
}

/**
 * Get detailed date object
 *
 * @param date Get detailed date object
 *
 * @returns parsed date object
 */
export const getParsedDate = (date: DateType) => {
  const parsedDate = dayjs(date, { format: 'YYYY-MM-DD HH:mm' })
  return {
    year: dayjs(date).year(),
    month: dayjs(date).month(),
    hour: Number(parsedDate.format('hh')),
    minute: dayjs(date).minute(),
  }
}

/**
 * Calculate month days array based on current date
 *
 * @param datetime - The current date that selected
 * @param displayFullDays
 * @param minimumDate - min selectable date
 * @param maximumDate - max selectable date
 * @param firstDayOfWeek - first day of week, number 0-6, 0 – Sunday, 6 – Saturday
 *
 * @returns days array based on current date
 */
export const getMonthDays = (
  datetime: DateType = dayjs(),
  displayFullDays: boolean,
  minimumDate: DateType,
  maximumDate: DateType,
  firstDayOfWeek: number
): IDayObject[] => {
  const date = getDate(datetime)
  const daysInMonth = date.daysInMonth()
  const prevMonthDays = date.add(-1, 'month').daysInMonth()
  const firstDay = date.date(1 - firstDayOfWeek)
  const dayOfMonth = firstDay.day() % 7

  const prevDays = displayFullDays
    ? Array.from({ length: dayOfMonth }, (_, i) => {
        const day = i + (prevMonthDays - dayOfMonth + 1)
        const thisDay = date.add(-1, 'month').date(day)
        return generateDayObject(day, thisDay, minimumDate, maximumDate, false)
      })
    : Array(dayOfMonth).fill(null)

  const monthDaysOffset = dayOfMonth + daysInMonth
  const nextMonthDays = displayFullDays
    ? monthDaysOffset > 35
      ? 42 - monthDaysOffset
      : 35 - monthDaysOffset
    : 0

  const currentDays = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1
    const thisDay = date.date(day)
    return generateDayObject(day, thisDay, minimumDate, maximumDate, true)
  })

  const nextDays = Array.from({ length: nextMonthDays }, (_, i) => {
    const day = i + 1
    const thisDay = date.add(1, 'month').date(day)
    return generateDayObject(day, thisDay, minimumDate, maximumDate, false)
  })

  return [...prevDays, ...currentDays, ...nextDays]
}

/**
 * Generate day object for displaying inside day cell
 *
 * @param day - number of day
 * @param date - calculated date based on day, month, and year
 * @param minDate - min selectable date
 * @param maxDate - max selectable date
 * @param isCurrentMonth - define the day is in the current month
 *
 * @returns days object based on current date
 */
const generateDayObject = (
  day: number,
  date: dayjs.Dayjs,
  minDate: DateType,
  maxDate: DateType,
  isCurrentMonth: boolean
) => {
  let disabled = false
  if (minDate) {
    disabled = date < getDate(minDate)
  }
  if (maxDate && !disabled) {
    disabled = date > getDate(maxDate)
  }
  return {
    text: day.toString(),
    day: day,
    date: getFormatedDate(date, DATE_FORMAT),
    disabled,
    isCurrentMonth,
  }
}
