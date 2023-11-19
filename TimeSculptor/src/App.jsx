import React from 'react';
import { useEffect, useState } from 'react'
import { redirect, BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header'
import AddEvent from './components/create'
import Events from './components/events'
import Login from './login';
import './App.css'
import dayjs from 'dayjs'
import { unstable_composeClasses } from '@mui/material';
import { GlobalContext } from './components/main_frame';

class Event {
  constructor(id, title, dateAndTime, icon, color, recurring = false) {
    this._id = id;
    this._title = title;
    this._dateAndTime = dateAndTime;
    this._icon = icon;
    this._color = color;
    this._recurring = recurring;
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

// use strategy design pattern to define event creation
class EventCreationStrategy {
  createEvent(id, title, dateAndTime, icon, color) {
    throw new Error("cannot call base creation strategy");
  }
}

class DefaultStrategy extends EventCreationStrategy {
  createEvent(id, title, dateAndTime, icon, color) {
    return new Event(id, title, dateAndTime, icon, color);
  }
}

class RecurringStrategy extends EventCreationStrategy {
  createEvent(id, title, dateAndTime, icon, color) {
    return new Event(id, title, dateAndTime, icon, color, true);
  }
}

function App() {

  // involved in routing, stores events as a kind of global variable
  const globalContext = React.useContext(GlobalContext);
  const events = globalContext.globalState.events;

  const [loggedIn, setLoggedIn] = useState(false);

  // class for functions that change events, triggerring a rerender. follows a 
  // Singleton design pattern
  class EventsController {
    static single_instance = null
    constructDefault = new DefaultStrategy();
    constructRecurring = new RecurringStrategy()

    constructor() {
      if(EventsController.single_instance) {
        return EventsController.single_instance
      }

      EventsController.single_instance = this;
      this.addEvent = this.addEvent.bind(this); 
    }

    generateDefaultEvent(event_data) {

      return this.constructDefault.createEvent(event_data.id, event_data.title, event_data.dateAndTime, event_data.icon, event_data.color)
    }

    generateRecurringEvent(event_data) {
      return this.constructRecurring.createEvent(event_data.id, event_data.title, event_data.dateAndTime, event_data.icon, event_data.color)
    }
  
    deleteEvent = (targetId) => {
      const event_name = events[targetId]?.title || "Unknown Event";
      const newEvents = events.filter((event) => event.id !== targetId);
      globalContext.setGlobalState((prevState) => ({...prevState, events:newEvents}));
    };
  
    editEvent = (updatedEvent) => {
      const index = events.findIndex((event) => event.id === updatedEvent.id);
 
      if (index !== -1) {
         const newEvents = [...events];
         newEvents[index] = updatedEvent;
         globalContext.setGlobalState((prevState) => ({...prevState, events:newEvents}));
      }
    };
  
    addEvent(newEvent, recurring = false) {
       const oldEvents = [...events];

       if (recurring) {
          oldEvents.push(this.generateRecurringEvent(newEvent))
       }

       else {
          oldEvents.push(this.generateDefaultEvent(newEvent));
       }

       globalContext.setGlobalState((prevState) => ({...prevState, events:oldEvents}));
   
    }

    
  }

  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log(loggedIn);
  }, [loggedIn])


  // instantiate single event controller
  const eventController = new EventsController()
  
  if (loggedIn) {
    // main display
    return (
      <div className='appContainer'>
        <Header />
        <AddEvent addEventFunction={eventController.addEvent} />
        <Events events={events} eventController={eventController}/>
      </div>
    )
  } else {
    return <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
  }

}

export default App
