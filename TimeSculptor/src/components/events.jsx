import React from 'react';
import './events.css'

export default function EventTable( {events} ) {
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
                        <th>Time</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => (
                        <tr key={event.id}>
                            <td className='statusCol'><input type="checkbox" /></td>
                            <td className='imageCol'><img src={event.icon} alt={event.id}/></td>
                            <td>{event.title}</td>
                            <td>{event.time}</td>
                            <td>{event.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>

        
    )
}