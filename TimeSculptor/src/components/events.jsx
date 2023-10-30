import React from 'react';
import './events.css';
import {BsFillTrashFill, BsFillPencilFill} from "react-icons/bs";
import EditDialog from './edit_dialog';
import DeleteWarning from './delete_warning';
import { useState } from 'react';

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


    return (
        <div className="eventsDisplay">
            <h2>
                Events
            </h2>
            <table>
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
                        <tr key={event.id} style={{backgroundColor: event.color, color: getTextColor(event.color)}}>
                            <td className='statusCol'><input type="checkbox" /></td>
                            <td className='imageCol'><img src={event.icon} alt={event.id}/></td>
                            <td>{event.title}</td>
                            <td className='dateCol'>{event.dateAndTime.format('L')}</td>                      
                            <td className='timeCol'>{event.dateAndTime.format('LT')}</td>
                            <td className='actionCol'>
                                <span>
                                    <BsFillTrashFill className="actionButton" onClick={() => {
                                        setDeleteWarningOpen(true)
                                        setSelectedEvent(event)
                                    }}
                                    />
                                    <BsFillPencilFill className="actionButton" onClick = {() => {
                                        setEventDialogOpen(true)
                                        setSelectedEvent(event)
                                    }}  
                                    />   
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <EditDialog open={eventDialogOpen} closeFunction={closeEditDialog} editEvent={editEvent} toEdit={selectedEvent}/>
            <DeleteWarning open={deleteWarningOpen} close={closeWarning} deleteEvent={deleteEvent} toDelete={selectedEvent}/>
            
        </div>

        
    )
}
