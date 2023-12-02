import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, ClickAwayListener, duration } from '@mui/material'
import TextField from '@mui/material/TextField'
import { v4 as uuid } from 'uuid'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker, TimePicker } from '@mui/x-date-pickers'
import MenuItem from '@mui/material/MenuItem'
import dayjs from 'dayjs'
import './dialog.css'

// This is the dialog box component for adding events
// parameters:
//  open: function that opens dialog
//  close: function that closes dialog
//  addEvent: function for adding events to main page
export default function AddDialog ({ open, close, addEvent, findTime }) {
  const [name, setName] = useState('')
  const [startTime, setStartTime] = useState(dayjs().startOf('hour').add(1, 'hour').second(0))
  const [endTime, setEndTime] = useState(dayjs().startOf('hour').add(2, 'hour').second(0))
  const [disablePast, setDisablePast] = useState(true)
  const [color, setColor] = useState('#029356')
  const [icon, setIcon] = useState('/assets/images/Work.png')
  // TODO: const [dynamicAddMenu, setDynamicAddMenu] = useState(false)

  const uniqueId = uuid()

  const nameChange = (event) => {
    setName(event.target.value)
  }

  const dateChange = (date) => {
    const newStartTime = date.hour(startTime.hour()).minute(startTime.minute());
    const newEndTime = date.hour(endTime.hour()).minute(endTime.minute());
    setStartTime(newStartTime)
    setEndTime(newEndTime)

    if (date.isAfter(dayjs(), 'day')) {
      setDisablePast(false)
    } else {
      setDisablePast(true)
    }

  }

  const startTimeChange = (time) => {
    setStartTime(time)
  }

  const endTimeChange = (time) => {
    setEndTime(time)
  }

  const colorChange = (event) => {
    setColor(event.target.value)
  }

  const iconChange = (event) => {
    setIcon(event.target.value)
  }

  const findATime = () => {
    let duration = endTime.diff(startTime, 'minute')

    const time = findTime(startTime, duration)

    if (time) {
      const chosenStartTime = time
      const chosenEndTime = time.add(duration, 'minutes')

      setStartTime(chosenStartTime)
      setEndTime(chosenEndTime)
    }

    else {
      alert('could not find a valid time')
      return
    }
  }

  const formSubmit = () => {
    // error handling if invalid date is entered for a new event.
    if (!startTime) {
      alert('Please select a date for the event.')
      return
    }

    // error handling if end time earlier than start time
    if (endTime.isBefore(startTime)) {
      alert('End Time cannot be earlier than Start Time.');
      return;
    }

    if (!name) {
      alert('Please enter a Name');
      return;
    }

    const newEvent = {
      id: uniqueId,
      title: name,
      dateAndTime: startTime,
      duration: endTime.diff(startTime, 'minute'),
      color,
      icon
    }

    addEvent(newEvent)

    close()
  }

  return (
    <>
      <Dialog
        open={open}
        maxWidth='md'
        className='popupMenu'
      >
        <DialogTitle>Add an Event</DialogTitle>
        <DialogContent className='eventDialog'>
          <TextField
            id='eventName'
            label='Event Name'
            fullWidth
            variant='filled'
            value={name}
            onChange={nameChange}
            sx={{ marginBottom: '30px' }}
          />
          <div className='dateTime'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Date'
                sx={{ overflow: 'visible', marginBottom: '30px', width: '60%' }}
                disablePast
                maxDate={dayjs().add(20, 'years')}
                value={startTime}
                onChange={dateChange}
              />
              <TimePicker
                label='Start Time'
                disablePast={disablePast}
                value={startTime}
                onChange={startTimeChange}
              />
              <TimePicker
                label='End Time'
                disablePast={disablePast}
                value={endTime}
                onChange={endTimeChange}
                minTime={startTime}
              />
            </LocalizationProvider>
            <Button onClick={findATime} sx={{ height: '66.66%' }}> Find A Time </Button>
          </div>

          <TextField
            id='color'
            select
            label='Color'
            type='color'
            variant='filled'
            value={color}
            onChange={colorChange}
            sx={{ width: '50%' }}
          >
            <MenuItem value='#029356'>Green</MenuItem>
            <MenuItem value='#009eb0'>Cyan</MenuItem>
            <MenuItem value='#0073e6'>Blue</MenuItem>
            <MenuItem value='#606ff3'>Purple</MenuItem>
            <MenuItem value='#9b8bf4'>Lavender</MenuItem>
          </TextField>
          <TextField
            id='icon'
            select
            label='Icon'
            variant='filled'
            value={icon}
            onChange={iconChange} // Function to handle changes in icon state variable
            sx={{ width: '50%' }}
          >
            <MenuItem value='/assets/images/Fitness.png'>Fitness</MenuItem>
            <MenuItem value='/assets/images/Work.png'>Work</MenuItem>
            <MenuItem value='/assets/images/Sleep.png'>Sleep</MenuItem>
            <MenuItem value='/assets/images/Social.png'>Social</MenuItem>
            <MenuItem value='/assets/images/Write.png'>Write</MenuItem>
            <MenuItem value='/assets/images/Entertain.png'>Entertain</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={formSubmit}> Submit </Button>
          <Button onClick={() => close()}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
