import React, {lazy}  from 'react';
import './events.css'

export default function Event(props) {
    return (
        <div className='event'>
            <div className='eventInfo'>
                <input type="checkbox" />
                <img src ={ props.image } />
                <h2>{props.title}</h2>
                <p>Time: {props.time}</p>
                <p>Date: {props.date}</p>
            </div>
        </div>
    )
}