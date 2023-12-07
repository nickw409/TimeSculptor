import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import AddDialog from './add_dialog'

// defines the add event button
// parameter:
//  addEventFunction: function that adds an event to the display
export default function AddEvent ({ addEvent, findTime }) {
  // useState that opens the event dialog component when the state is changed
  const [eventDialogOpen, setEventDialogOpen] = useState(false)

  // passed into the event_dialog component below in order to close the dialog component
  function closeDialog () {
    setEventDialogOpen(false)
  }

  // when the button is clicked, the dialog component is opened
  return (
    <Box
      justifyContent='center'
      alignItems='center'
      display='flex'
      border='1px solid black'
      height='100px'
      width='100vw'
      marginTop='75px'
    >
      <Button
        variant='contained'
        onClick={() => setEventDialogOpen(true)}
        sx={{
          backgroundColor: '#F0EAD6',
          color: 'black'
        }}
      >
        Add Event
      </Button>
      <AddDialog open={eventDialogOpen} close={closeDialog} addEvent={addEvent} findTime={findTime} />
    </Box>
  )
}
