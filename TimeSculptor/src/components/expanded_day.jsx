import React from 'react'
import { Dialog, DialogTitle, DialogActions, DialogContent, Button } from '@mui/material'
import dayjs from 'dayjs'

export default function ExpandedDay ({ open, close, day, events, getTextColor }) {
  return (
    <>
      <Dialog open={open} maxWidth='md' PaperProps={{ style: { maxHeight: '80vh', height: '80vh' } }}>
        <DialogTitle>{day.format('DD MMMM YYYY')}</DialogTitle>
        <DialogContent>
          <div className='expandedEvents'>
            {
              events && events.length > 0
                ? (
                    events.map(event => (
                      <div key={event.id} className='expandedEvent' style={{ backgroundColor: event.color, color: getTextColor(event.color) }}>
                        <img src={event.icon} alt={event.id} />{event.title} @ {dayjs(event.dateAndTime).format('LT')}
                      </div>
                    ))
                  )
                : (
                  <div />
                  )
            }
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => close()}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
