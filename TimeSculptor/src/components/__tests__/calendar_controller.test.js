import { render, screen, fireEvent } from '@testing-library/react'
import CalendarController from '../CalendarController'

describe('CalendarController Component', () => {
  // create fake events for testing
  const mockEvents = [
    {
      id: 1,
      title: 'Event 1',
      dateAndTime: '2023-12-10T12:00:00',
      color: '#FF5733',
      icon: 'icon1.png'
    },
    {
      id: 2,
      title: 'Event 2',
      dateAndTime: '2024-01-15T15:30:00',
      color: '#45AAB8',
      icon: 'icon2.png'
    }
  ]

  test('calls nextMonth when next button is clicked', () => {
    const mockNextMonth = jest.fn()
    render(<CalendarController events={mockEvents} nextMonth={mockNextMonth} />)

    const nextButton = screen.getByText('Next')
    fireEvent.click(nextButton)

    expect(mockNextMonth).toHaveBeenCalled()
  })

  test('calls prevMonth when prev button is clicked', () => {
    const mockPrevMonth = jest.fn()
    render(<CalendarController events={mockEvents} prevMonth={mockPrevMonth} />)

    const prevButton = screen.getByText('Prev')
    fireEvent.click(prevButton)

    expect(mockPrevMonth).toHaveBeenCalled()
  })
})
