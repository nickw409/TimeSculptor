import { render, screen, fireEvent } from '@testing-library/react'
import Calendar from '../Calendar'
import dayjs from 'dayjs'

describe('Calendar Component', () => {
// create fake events for testing
  const mockEvents = [
    {
      id: 1,
      title: 'testEvent1',
      dateAndTime: '2023-11-10T12:00:00',
      color: '#FF5733',
      icon: 'icon1.png'
    },
    {
      id: 2,
      title: 'testEvent2',
      dateAndTime: '2023-11-15T15:30:00',
      color: '#45AAB8',
      icon: 'icon2.png'
    }
  ]

  // creating a mock month and year
  const testMonth = 11
  const testYear = 2023

  test('renders the calendar with the correct month and year', () => {
    render(<Calendar month={testMonth} year={testYear} events={[]} />)
    const monthHeading = screen.getByText('November 2023')
    expect(monthHeading).toBeInTheDocument()
  })

  test('renders the days of the week in the correct order', () => {
    render(<Calendar month={testMonth} year={testYear} events={[]} />)
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    daysOfWeek.forEach((day) => {
      const dayHeader = screen.getByText(day)
      expect(dayHeader).toBeInTheDocument()
    })
  })

  test('correct number of days for January', () => {
    expect(getDaysInMonth('2023-01-01')).toBe(31)
  })
  test('correct number of days for February', () => {
    expect(getDaysInMonth('2023-02-01')).toBe(28)
  })
  test('correct number of days for February on a leap year', () => {
    expect(getDaysInMonth('2024-02-01')).toBe(29)
  })
  test('correct number of days for March', () => {
    expect(getDaysInMonth('2023-03-01')).toBe(31)
  })
  test('correct number of days for April', () => {
    expect(getDaysInMonth('2023-04-01')).toBe(30)
  })
  test('correct number of days for May', () => {
    expect(getDaysInMonth('2023-05-01')).toBe(31)
  })
  test('correct number of days for June', () => {
    expect(getDaysInMonth('2023-06-01')).toBe(30)
  })
  test('correct number of days for July', () => {
    expect(getDaysInMonth('2023-07-01')).toBe(31)
  })
  test('correct number of days for August', () => {
    expect(getDaysInMonth('2023-08-01')).toBe(31)
  })
  test('correct number of days for September', () => {
    expect(getDaysInMonth('2023-09-01')).toBe(30)
  })
  test('correct number of days for October', () => {
    expect(getDaysInMonth('2023-10-01')).toBe(31)
  })
  test('correct number of days for November', () => {
    expect(getDaysInMonth('2023-11-01')).toBe(30)
  })
  test('correct number of days for December', () => {
    expect(getDaysInMonth('2023-12-01')).toBe(31)
  })
  test('renders the days of the month with the correct events', () => {
    render(<Calendar month={testMonth} year={testYear} events={mockEvents} />)
    const event1 = screen.getByText('testEvent1 @ 12:00 PM')
    const event2 = screen.getByText('testEvent2 @ 3:30 PM')
    expect(event1).toBeInTheDocument()
    expect(event2).toBeInTheDocument()
  })

  test('calls dayClick when a day is clicked', () => {
    const mockDayClick = jest.fn()
    render(<Calendar month={testMonth} year={testYear} events={[]} dayClick={mockDayClick} />)
    const dayCell = screen.getByText('1')
    fireEvent.click(dayCell)
    expect(mockDayClick).toHaveBeenCalledWith(dayjs(`${testYear}-${testMonth + 1}-1`, 'YYYY-MM-DD'))
  })
})
