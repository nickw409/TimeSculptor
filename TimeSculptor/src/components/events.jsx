import React from 'react';
import Event from './singleEvent'
import './events.css'

const events = [
    {
        id: "1",
        title: "Eat",
        date: "10/22/23",
        time: "12:00PM",
        icon: "/assets/images/login.png"
    },

    {
        id: "2",
        title: "Sleep",
        date: "10/24/23",
        time: "8:00PM",
        icon: "/assets/images/register.png"
    }
]

export default function Events() { 
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