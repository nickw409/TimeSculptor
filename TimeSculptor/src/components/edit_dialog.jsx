// imports for date/time picker components
import React, { useState, useEffect } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { Dialog, DialogTitle, DialogActions, DialogContent, Button } from '@mui/material'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

export default function EditDialog ({ open, close, editEvent, toEdit }) {
  const [name, setName] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [color, setColor] = useState('')
  const [icon, setIcon] = useState('')

  useEffect(() => {
    setName(toEdit.title)
    setDateTime(toEdit.dateAndTime)
    setColor(toEdit.color)
  }, [toEdit])

  const nameChange = (event) => {
    setName(event.target.value)
  }

  const dateTimeChange = (date) => {
    setDateTime(date.toDate())
  }

  // Set the color state when an option is selected
  const colorChange = (event) => {
    setColor(event.target.value)
  }

  // Set the icon state when an option is selected
  const iconChange = (event) => {
    setIcon(event.target.value)
  }

  const formSubmit = () => {
    const newEvent = {
      id: toEdit.id,
      title: name,
      dateAndTime: dateTime,
      color,
      icon
    }

    editEvent(newEvent)

    close()
  }

  return (
    <Dialog
      open={open}
      maxWidth='md'
      className='popupMenu'
    >
      <DialogTitle>Edit an Event</DialogTitle>
      <DialogContent className='eventDialog'>
        <TextField
          // text field for event name
          id='eventName'
          label='Event Name'
          fullWidth
          variant='filled'
          value={name}
          onChange={nameChange}
          sx={{ marginBottom: '30px' }}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            sx={{ overflow: 'visible', marginBottom: '30px' }}
            label='Event Date/Time'
            disablePast
            value={dateTime}
            onChange={dateTimeChange}
          />
        </LocalizationProvider>

        <TextField
          id='color'
          select
          label='Color'
          type='color'
          variant='filled'
          value={color}
          onChange={colorChange} // Call the colorChange function when an option is selected
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
          onChange={iconChange} // Call the iconChange function when an option is selected
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
  )
}
