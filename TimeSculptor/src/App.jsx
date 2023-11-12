import { useEffect, useState } from 'react'
import { redirect, BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header'
import AddEvent from './components/create'
import Events from './components/events'
import Login from './login';
import './App.css'
import dayjs from 'dayjs'
import { unstable_composeClasses } from '@mui/material';

class Event {
  constructor(id, title, dateAndTime, icon, color) {
    this._id = id;
    this._title = title;
    this._dateAndTime = dateAndTime;
    this._icon = icon;
    this._color = color;
  }

  get id() {
    return this._id;
  }

  set id(newId) {
    this._id = newId;
  }

  get title() {
    return this._title;
  }

  set title(newTitle) {
    this._title = newTitle;
  }

  get dateAndTime() {
    return this._dateAndTime;
  }

  set dateAndTime(newDateAndTime) {
    this._dateAndTime = newDateAndTime;
  }

  get icon() {
    return this._icon;
  }

  set icon(newIcon) {
    this._icon = newIcon;
  }

  get color() {
    return this._color;
  }

  set color(newColor) {
    this._color = newColor;
  }
}


const initialEvents = [
  new Event("1", "Eat", dayjs(new Date(2023, 12, 24)), "/assets/images/login.png", "#0073e6"),
  new Event("2", "Sleep", dayjs(new Date(2023, 11, 16)), "/assets/images/register.png", "#9b8bf4"),
]

function App() {
  // this useState dynamically updates our list of events
  // when a new event is added
  const [events, setEvents] = useState(initialEvents);
  const [loggedIn, setLoggedIn] = useState(false);
  

  // class for functions that change events, triggerring a rerender
  class EventsController {
    static deleteEvent = (targetId) => {
      setEvents(events.filter(event => event.id !== targetId));
    };

    static editEvent = (updatedEvent) => {
      const index = events.findIndex((event) => event.id == updatedEvent.id)
  
      if (index !== -1) {
        const newEvents = [...events];
        newEvents[index] = updatedEvent;
        setEvents(newEvents);
      }
    };

    static addEvent(newEvent) {
      const oldEvents = [...events];
      oldEvents.push(newEvent);
      setEvents(oldEvents);
    }
  }

  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log(loggedIn);
  }, [loggedIn])

  // addEvent takes the array of events and updates it with the new event
  

  if (loggedIn) {
    // main display
    return (
      <div className='appContainer'>
        <Header />
        <AddEvent addEventFunction={EventsController.addEvent} />
        <Events events={events} eventController={EventsController}/>
      </div>
    )
  } else {
    return <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
  }

}

export default App
