import React from 'react';
import './events.css';
import {BsFillTrashFill, BsFillPencilFill} from "react-icons/bs";
import { useState } from 'react';
import dayjs from 'dayjs';
import EditDialog from './edit_dialog';
import DeleteWarning from './delete_warning';
import Calendar from './calendar';

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



export default function EventTable( {events, deleteEvent, editEvent } ) {
    function closeEditDialog()
        {
            setEventDialogOpen(false);
        }
    
    function closeWarning()
        {
            setDeleteWarningOpen(false);
        }

    const [eventDialogOpen, setEventDialogOpen] = useState(false);
    const [deleteWarningOpen, setDeleteWarningOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({id: "", title: "", dateAndTime:"", icon: "", color: ""})
    const [viewType, setViewType] = useState("list")

    const renderListView = () => {
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
                    {events.map(event => (
                        <tr key={event.id} style={{ backgroundColor: event.color, color: getTextColor(event.color) }}>
                            <td className='statusCol'><input type="checkbox" /></td>
                            <td className='imageCol'><img src={event.icon} alt={event.id} /></td>
                            <td>{event.title}</td>
                            <td className='dateCol'>{dayjs(event.dateAndTime).format('L')}</td>
                            <td className='timeCol'>{dayjs(event.dateAndTime).format('LT')}</td>
                            <td className='actionCol'>
                                <BsFillTrashFill className="actionButton" onClick={() => {
                                    setDeleteWarningOpen(true);
                                    setSelectedEvent(event);
                                }}
                                />
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
    };

    const renderCalendarView = () => {
        return (
            <Calendar className="calendarTable"/>
        );
    };


    return (
        <div className="eventsDisplay">
            <h2>
                Events
            </h2>
            <div>
                <input type="radio" value="List" name="view" defaultChecked onClick={() => {setViewType("list")}}/> List
                <input type="radio" value="Calendar" name="view" onClick={() => {setViewType("calendar")}}/> Calendar
            </div>
            
            {viewType === "list" ? renderListView() : renderCalendarView()}


            <EditDialog open={eventDialogOpen} closeFunction={closeEditDialog} editEvent={editEvent} toEdit={selectedEvent}/>
            <DeleteWarning open={deleteWarningOpen} close={closeWarning} deleteEvent={deleteEvent} toDelete={selectedEvent}/>
            
        </div>

        
    )
}
