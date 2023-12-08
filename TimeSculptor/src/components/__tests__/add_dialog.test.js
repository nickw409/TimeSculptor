import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import AddDialog from '../add_dialog'

describe('AddDialog Component', () => {
  // functions for testing sicne closeFunction and addEvent are not set by default
  const closeFunction = jest.fn()
  const addEvent = jest.fn()

  beforeEach(() => {
    render(
      <AddDialog open closeFunction={closeFunction} addEvent={addEvent} />
    )
  })

  it('should load the input feilds', () => {
    // Check if the dialog title loads correctly
    expect(screen.getByText('Add an Event')).toBeInTheDocument()

    // Check if input field loads
    expect(screen.getByLabelText('Event Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Event Date/Time')).toBeInTheDocument()
    expect(screen.getByLabelText('Color')).toBeInTheDocument()

    // Check if the two buttons load
    expect(screen.getByText('Submit')).toBeInTheDocument()
    expect(screen.getByText('Close')).toBeInTheDocument()
  })

  it('should close the text box', () => {
    const closeButton = screen.getByText('Close')
    fireEvent.click(closeButton)
    expect(closeFunction).toHaveBeenCalledTimes(1)
  })

  it('should change the event details', () => {
    const eventNameInput = screen.getByLabelText('Event Name')
    const dateInput = screen.getByLabelText('Event Date/Time')
    const colorInput = screen.getByLabelText('Color')

    // input a test event
    fireEvent.change(eventNameInput, { target: { value: 'Test Event' } })
    fireEvent.change(dateInput, { target: { value: '2053-9-10T1:34' } })
    fireEvent.change(colorInput, { target: { value: '#ffffff' } })

    // Check if the state is updated
    expect(eventNameInput.value).toBe('Test Event')

    // check the time, date and color of the event to match
    expect(dateInput.value).toBe('2053-9-10T1:34')
    expect(colorInput.value).toBe('#ffffff')
  })

  it('should call addEvent and closeFunction ony once', () => {
    const submitButton = screen.getByText('Submit')
    fireEvent.click(submitButton)

    // Verify that addEvent and closeFunction are called only once
    expect(addEvent).toHaveBeenCalledTimes(1)
    expect(closeFunction).toHaveBeenCalledTimes(1)
  })
})
