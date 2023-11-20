import Calendar from './calendar'
import { useState } from 'react'
import dayjs from 'dayjs'

// define default calendar controller
// parameters:
//  events(list(Event)): the current list of events
//  getTextColor: optional function for getting text color on event display
//  updateViewType: optional function for updated the current view, used to
//                  expand day in monthly view into daily view
//  setSelectedDay: optional function, used to update the day for daily view
export default function CalendarController ({ events, getTextColor = null, updateViewType = null, setSelectedDay = null }) {
  const today = dayjs()
  const [currMonthObject, setCurrMonthObject] = useState(today)

  const nextMonth = () => {
    setCurrMonthObject(currMonthObject.add(1, 'month'))
  }

  const prevMonth = () => {
    setCurrMonthObject(currMonthObject.subtract(1, 'month'))
  }

  const handleDayClick = (day) => {
    setSelectedDay(day)
    updateViewType('daily')
  }

  // return the defauly monthly calendar view
  return (
    <Calendar
      month={currMonthObject.format('MM')}
      year={currMonthObject.format('YYYY')}
      prevMonth={prevMonth}
      nextMonth={nextMonth}
      events={events}
      getTextColor={getTextColor}
      dayClick={handleDayClick}
    />
  )
}