import './calendar.css'
import dayjs from 'dayjs'
import { Button } from '@mui/material'

// gets the current days of the month
// parameter:
//  monthDay(dayjs Object): the current month
export const getDaysInMonth = (monthDay) => {
  // clone month, set the day object to the first day of the month
  let currMonth = monthDay.clone()
  currMonth.startOf('month')

  const days = []

  // loop through all the days in the month, adding them to days array
  while (currMonth.month() === monthDay.month()) {
    days.push(currMonth.clone())
    currMonth = currMonth.add(1, 'day')
  }

  return days
}

// given an array of day objects, splits the days into weeks
export const splitWeeks = (dayObjects) => {
  const weeks = []
  let currWeek = []

  // iterate through days
  for (const day of dayObjects) {
    currWeek.push(day.clone())

    // after saturday is added, split the week
    if (day.format('dddd') === 'Saturday') {
      weeks.push(currWeek)
      currWeek = []
    }
  }

  // add remaining days to their own week
  if (currWeek.length > 0) {
    weeks.push(currWeek)
  }

  return weeks
}

// add "null" days to the front of the week if the week doesn't start on Sunday
const weekFront = (week, padWith = null) => {
  return [...Array(7 - week.length).fill(padWith), ...week]
}

// add "null" days to the end of the week if the week doesn't end on Saturday
const weekBack = (week, padWith = null) => {
  return [...week, ...Array(7 - week.length).fill(padWith)]
}

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// define default function for displaying a monthly calendar
// parameters:
//  month(dayjs object): current month
//  year(dayjs object): current year
//  nextMonth: function for moving to next month
//  prevMonth: function for moving to previous month
//  events(list(Event)): list of current events in schedule
//  getTextColor: function to retrieve the text colors from the main app
//  dayClick: function that enables the expansion of days in calendar
export default function Calendar ({ month, year, prevMonth, nextMonth, events, getTextColor, dayClick }) {
  // format current month, get the weeks to display
  const currMonthObject = dayjs(`${year}-${month}-01`, 'YYYY-MM-DD')
  const weeks = splitWeeks(getDaysInMonth(currMonthObject))

  return (
    <div key='evencalen' className='eventCalendar'>
      <h1 className='monthHeading'>
        {currMonthObject.format('MMMM YYYY')}
      </h1>

      <div className='changeMonthButtons'>
        <Button onClick={prevMonth}> Prev </Button>
        <Button onClick={nextMonth}> Next </Button>
      </div>

      <table className='calendarTable'>
        <thead>
          <tr>{weekDays.map(day => <th key={day}>{day}</th>)}</tr>
        </thead>
        <tbody>
          {weeks.map((week, i) => {
            const displayWeek = i === 0
              ? weekFront(week)
              : i === weeks.length - 1
                ? weekBack(week)
                : week

            return (
              // Process each day
              <tr key={i}>
                {displayWeek.map((dayObject, j) => {
                  let currEvents = []

                  if (dayObject) {
                    // match events that are on the same day, then sort based on time
                    currEvents = events
                      .filter(event => dayObject.isSame(event.dateAndTime, 'day'))
                      .sort((firstEvent, secondEvent) =>
                        dayjs(firstEvent.dateAndTime).isBefore(secondEvent.dateAndTime) ? -1 : 1
                      )
                  }

                  return dayObject
                    ? (
                      <td
                        className='dayCell'
                        onClick={() => {
                          dayClick(dayObject)
                        }}
                        key={(dayObject.format('D'))}
                      >

                        {/* Print the numerical value of the day */}
                        {dayObject.format('D')}

                        {/* Print the events associated with current day */}
                        <div className='cellEvents'>
                          {/* match all events that are on the same day, then sort them by time */}
                          {currEvents.map(event => (
                            <div key={event.id} className='cellEvent' style={{ backgroundColor: event.color, color: getTextColor(event.color) }}>
                              <img src={event.icon} alt={event.id} /> <div className='cellEventText'>{event.title} @ {dayjs(event.dateAndTime).format('LT')}</div>
                            </div>
                          ))}
                        </div>
                      </td>

                      )
                    : (
                      <td className='nullCell' key={`${i}${j}`} />
                      )
                })}
              </tr>

            )
          })}
        </tbody>
      </table>
    </div>
  )
}
