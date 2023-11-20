import './events.css'
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs'
import React, { useState } from 'react'
import dayjs from 'dayjs'
import EditDialog from './edit_dialog'
import DeleteWarning from './delete_warning'
import CalendarController from './calendar_controller'
import { Button } from '@mui/material'

function getTextColor (hexColor) {
  const colorMap = {
    '#029356': '#000000',
    '#009eb0': '#000000',
    '#0073e6': '#ffffff',
    '#606ff3': '#000000',
    '#9b8bf4': '#000000'
  }

  return colorMap[hexColor] || '#000000'
}

export default function EventTable ({ events, eventController }) {
  function closeEditDialog () {
    setEventDialogOpen(false)
  }

  function closeWarning () {
    setDeleteWarningOpen(false)
  }

  const [eventDialogOpen, setEventDialogOpen] = useState(false)
  const [deleteWarningOpen, setDeleteWarningOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState({ id: '', title: '', dateAndTime: '', icon: '', color: '' })
  const [selectedDay, setSelectedDay] = useState(dayjs())
  const [viewType, setViewType] = useState('list')

  const updateViewType = (type) => {
    if (viewType === 'daily' && type !== 'daily') {
      setSelectedDay(dayjs())
    }

    setViewType(type)
  }

  const renderListView = (eventList) => {
    if (eventList.length !== 0) {
      const sortedEvents = eventList.sort((firstEvent, secondEvent) =>
        dayjs(firstEvent.dateAndTime).isBefore(secondEvent.dateAndTime) ? -1 : 1
      )

      return (
        <table className='listTable'>
          <thead>
            <tr>
              <th className='statusCol'>Status</th>
              <th className='imageCol'>Image</th>
              <th>Title</th>
              <th className='dateCol'>Date</th>
              <th className='timeCol'>Time</th>
              <th className='actionCol'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedEvents.map(event => (
              <tr key={event.id} style={{ backgroundColor: event.color, color: getTextColor(event.color) }}>
                <td className='statusCol'><input type='checkbox' /></td>
                <td className='imageCol'><img src={event.icon} alt={event.id} /></td>
                <td>{event.title}</td>
                <td className='dateCol'>{dayjs(event.dateAndTime).format('L')}</td>
                <td className='timeCol'>{dayjs(event.dateAndTime).format('LT')}</td>
                <td className='actionCol'>
                  <BsFillTrashFill
                    className='actionButton'
                    onClick={() => {
                      setDeleteWarningOpen(true)
                      setSelectedEvent(event)
                    }}
                  />
                  <BsFillPencilFill
                    className='actionButton'
                    onClick={() => {
                      setEventDialogOpen(true)
                      setSelectedEvent(event)
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    } else {
      return (
        <>
          No Events to Display
        </>
      )
    }
  }

  const renderCalendarView = () => {
    return (
      <CalendarController className='calendarTable' events={events} getTextColor={getTextColor} updateViewType={updateViewType} setSelectedDay={setSelectedDay} />
    )
  }

  const renderDailyView = () => {
    const prevDay = () => {
      setSelectedDay(selectedDay.subtract(1, 'day'))
    }

    const nextDay = () => {
      setSelectedDay(selectedDay.add(1, 'day'))
    }

    return (
      <div className='dailyView'>
        <h1>
          {selectedDay.format('L')}
        </h1>
        <div className='changeDayButtons'>
          <Button onClick={prevDay}> Prev </Button>
          <Button onClick={nextDay}> Next </Button>
        </div>
        {renderListView(events.filter(event => selectedDay.isSame(event.dateAndTime, 'day')))}
      </div>
    )
  }

  return (
    <div className='eventsDisplay'>
      <h2>
        Events
      </h2>

      <div>
        <input type='radio' value='List' name='view' checked={viewType === 'list'} onChange={() => updateViewType('list')} /> List
        <input type='radio' value='Calendar' name='view' checked={viewType === 'calendar'} onChange={() => updateViewType('calendar')} /> Monthly
        <input type='radio' value='Daily' name='view' checked={viewType === 'daily'} onChange={() => updateViewType('daily')} /> Daily
      </div>

      {viewType === 'list' ? renderListView(events) : viewType === 'calendar' ? renderCalendarView() : renderDailyView()}

      <EditDialog open={eventDialogOpen} close={closeEditDialog} editEvent={eventController.editEvent} toEdit={selectedEvent} />
      <DeleteWarning open={deleteWarningOpen} close={closeWarning} deleteEvent={eventController.deleteEvent} toDelete={selectedEvent} />
    </div>
  )
}
