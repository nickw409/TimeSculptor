import React from 'react';
import './events.css';
import {BsFillTrashFill, BsFillPencilFill} from "react-icons/bs";
import { useState } from 'react';
import dayjs from 'dayjs';
import EditDialog from './edit_dialog';
import DeleteWarning from './delete_warning';
import CalendarController from './calendar_controller';
import { Button } from '@mui/material'

// define text colors, formatted as "color: text-color"
function getTextColor(hexColor) {
    const colorMap = {
        '#029356': '#000000',
        '#009eb0': '#000000',
        '#0073e6': '#ffffff',
        '#606ff3': '#000000',
        '#9b8bf4': '#000000'
    };

    return colorMap[hexColor] || '#000000'; 
}


// define default function for showing the events
// parameters:
//  events(list(Event)): current list of events
//  eventsController: class of functions for manipulating events, namely:
//      addEvent, deleteEvent, and deleteEvent
export default function EventTable( {events, eventController} ) {
    function closeEditDialog()
        {
            setEventDialogOpen(false);
        }
    
    function closeWarning()
        {
            setDeleteWarningOpen(false);
        }
    
    // set states for dialogues, the current selected day and events, and the current
    // view type for the events
    const [eventDialogOpen, setEventDialogOpen] = useState(false);
    const [deleteWarningOpen, setDeleteWarningOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({id: "", title: "", dateAndTime:"", icon: "", color: ""});
    const [selectedDay, setSelectedDay] = useState(dayjs())
    const [viewType, setViewType] = useState("list");
    
    // used to reset daily view to today when daily view is switched off of
    const updateViewType = (type) => {
        if (viewType === "daily" && type !== "daily") {
            setSelectedDay(dayjs());
        }

        setViewType(type);
    };

    // define the list view, where events are simply displayed in a list format
    const renderListView = (event_list) => {

        // by default, sort events by day and time, if there are events
        if (event_list.length !== 0) {
            const sorted_events = event_list.sort((first_event, second_event) =>
                dayjs(first_event.dateAndTime).isBefore(second_event.dateAndTime) ? -1 : 1
            );

            return (
                <table className='listTable'>
                    <thead>
                        <tr>
                            <th className='statusCol'>Status<img src="/public/assets/images/status.png" alt = "Status Icon"/></th>
                            <th className='imageCol'>Image<img src="/public/assets/images/image.png" alt = "Image Icon"/></th>
                            <th style={{ fontSize: '40px' }}>Title</th>
                            <th className='dateCol'>Date<img src="/public/assets/images/date.png" alt = "Date Icon"/></th>
                            <th className='timeCol'>Time<img src="/public/assets/images/time.png" alt = "Time Icon"/></th>
                            <th className='actionCol'>Actions<img src="/public/assets/images/action.png" alt = "Action Icon"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapp all events to a row in the table */}
                        {sorted_events.map(event => (
                            <tr key={event.id} style={{ backgroundColor: event.color, color: getTextColor(event.color) }}>
                                <td className='statusCol'><input type="checkbox" /></td>
                                <td className='imageCol'><img src={event.icon} alt={event.id} /></td>
                                <td>{event.title}</td>
                                <td className='dateCol'>{dayjs(event.dateAndTime).format('L')}</td>
                                <td className='timeCol'>{dayjs(event.dateAndTime).format('LT')}</td>
                                <td className='actionCol'>
                                    {/* Define a button for deleting events */}
                                    <BsFillTrashFill className="actionButton" onClick={() => {
                                        setDeleteWarningOpen(true);
                                        setSelectedEvent(event);
                                    }}
                                    />
                                    {/* Define a button for editing events */}
                                    <BsFillPencilFill className="actionButton" onClick={() => {
                                        setEventDialogOpen(true);
                                        setSelectedEvent(event);
                                    }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }

        // no events, display empty message
        else {
            return(
                <>
                    No Events to Display
                </>
            )
        }
        
    };

    // define monthly clandar view, using a typical calendar format
    const renderCalendarView = () => {
        return (
            <CalendarController className="calendarTable" events={events} getTextColor={getTextColor} updateViewType={updateViewType} setSelectedDay={setSelectedDay}/>
        );
    };

    // define daily view, where the events for a selected day are shown
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
                    {/* Define buttons for moving to the next/previous days */}
                    <Button onClick={prevDay}> Prev </Button>
                    <Button onClick={nextDay}> Next </Button>
                </div>

                {/* call list view to display the current day's events */}
                {renderListView(events.filter(event => selectedDay.isSame(event.dateAndTime, 'day')))}
            </div>
        )
    }

    


    return (
        <div className="eventsDisplay">
            <h2>
                Events
            </h2>

            {/* Radio menu for selecting view type */}
            <div>
                <input type="radio" value="List" name="view" checked={viewType === "list"} onChange={() => updateViewType("list")} /> List
                <input type="radio" value="Calendar" name="view" checked={viewType === "calendar"} onChange={() => updateViewType("calendar")} /> Monthly
                <input type="radio" value="Daily" name="view" checked={viewType === "daily"} onChange={() => updateViewType("daily")} /> Daily
            </div>
            
            {/* Determine render based on the current view type */}
            {viewType === "list" ? renderListView(events) : viewType === "calendar" ? renderCalendarView() : renderDailyView()}

            {/* Define dialogues for editing and deleting */}
            <EditDialog open={eventDialogOpen} close={closeEditDialog} editEvent={eventController.editEvent} toEdit={selectedEvent}/>
            <DeleteWarning open={deleteWarningOpen} close={closeWarning} deleteEvent={eventController.deleteEvent} toDelete={selectedEvent}/>
        </div>

        
    )
}
