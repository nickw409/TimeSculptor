import React from 'react';
import Event from './singleEvent'
import './events.css'

export default function Events( {events} ) {
    return (
        <div className="eventsDisplay">
            <h1>
                Events
            </h1>

            {events.map(event => (
                <Event
                    key={event.id} 
                    title={event.title}
                    date={event.date}
                    image={event.icon}
                    time={event.time}
                />
            ))}
        </div>

        
    )
}