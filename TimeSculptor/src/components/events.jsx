import React from 'react';
import './events.css'
import {BsFillTrashFill, BsFillPencilFill} from "react-icons/bs"
import EditDialog from './edit_dialog'
import { useState } from 'react';

export default function EventTable( {events, deleteEvent, editEvent } ) {
    function closeDialog()
        {
            setEventDialogOpen(false);
        }

    const [eventDialogOpen, setEventDialogOpen] = useState(false);

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
                        <th className='timeCol'>Time</th>
                        <th className='dateCol'>Date</th>
                        <th className='actionCol'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => (
                        <tr key={event.id}>
                            <td className='statusCol'><input type="checkbox" /></td>
                            <td className='imageCol'><img src={event.icon} alt={event.id}/></td>
                            <td>{event.title}</td>
                            <td className='timeCol'>{event.time}</td>
                            <td className='dateCol'>{event.date}</td>
                            <td className='actionCol'>
                                <span>
                                    <BsFillTrashFill className="actionButton" onClick={() => {
                                        deleteEvent(event.id)
                                    }}
                                    />
                                    <BsFillPencilFill className="actionButton" onClick = {() => {
                                        setEventDialogOpen(true)
                                    }}  
                                    />
                                    <EditDialog open={eventDialogOpen} closeFunction={closeDialog} editEvent={editEvent} toEdit={event.id}/>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>

        
    )
}