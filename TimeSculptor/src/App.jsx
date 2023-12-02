import React, { useEffect, useState } from 'react'
// import { redirect, BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import AddEvent from './components/create'
import Events from './components/events'
import Login from './login'
import dayjs from 'dayjs'
import './App.css'
import { GlobalContext } from './components/main_frame'
import { BsChevronCompactLeft } from 'react-icons/bs'

// create event class, with the following attributes:
//  id(str): a unique id for the event, generated by uuid
//  title(str): the title of the event
//  dateAndTime(dayJs object): date and time of the event
//  icon(str): file path to the event's corresponsing icon
//  color(hex id(str)): the associated event collor
//  recurring: optional parameter to define a recurring event
class Event {
  // object definition
  constructor (id, title, dateAndTime, duration, icon, color, recurring = false) {
    this._id = id
    this._title = title
    this._dateAndTime = dateAndTime
    this._duration = duration
    this._icon = icon
    this._color = color
    this._recurring = recurring
  }

  // getters and setters
  get id () {
    return this._id
  }

  set id (newId) {
    this._id = newId
  }

  get title () {
    return this._title
  }

  set title (newTitle) {
    this._title = newTitle
  }

  get dateAndTime () {
    return this._dateAndTime
  }

  set dateAndTime (newDateAndTime) {
    this._dateAndTime = newDateAndTime
  }

  get duration () {
    return this._duration
  }

  set duration (newDuration) {
    this._duration = newDuration
  }

  get icon () {
    return this._icon
  }

  set icon (newIcon) {
    this._icon = newIcon
  }

  get color () {
    return this._color
  }

  set color (newColor) {
    this._color = newColor
  }
}

// use strategy design pattern to define event creation, can be default or recurring
class EventCreationStrategy {
  createEvent (id, title, dateAndTime, icon, color) {
    throw new Error('cannot call base creation strategy')
  }
}

class DefaultStrategy extends EventCreationStrategy {
  createEvent (id, title, dateAndTime, duration, icon, color) {
    return new Event(id, title, dateAndTime, duration,  icon, color)
  }
}

class RecurringStrategy extends EventCreationStrategy {
  createEvent (id, title, dateAndTime, duration, icon, color) {
    return new Event(id, title, dateAndTime, duration, icon, color, true)
  }
}

function App () {
  // for calculating times
  const ONE_HOUR = 60
  const HALF_HOUR = 30
  const EIGHT_PM = 20
  const EIGHT_AM = 8

  // involved in routing, stores events as a kind of global variable
  const globalContext = React.useContext(GlobalContext)
  const events = globalContext.globalState.events
  const [loggedIn, setLoggedIn] = useState(true)

  // class for functions that change (add/edit/delete) events, triggerring a rerender.
  // follows a Singleton design pattern.
  class EventsController {
    // used to ensure only one instance exists, ensuring Singleton
    static single_instance = null

    // setup strategies for event creation
    constructDefault = new DefaultStrategy()
    constructRecurring = new RecurringStrategy()

    // only construct if this is the first instance
    constructor () {
      if (EventsController.single_instance) {
        return EventsController.single_instance
      }

      EventsController.single_instance = this

      this.addEvent = this.addEvent.bind(this)

      this.findTime = this.findTime.bind(this)
    }

    // create an event, implement default and recurring strategy
    generateDefaultEvent (eventData) {
      return this.constructDefault.createEvent(eventData.id, eventData.title, eventData.dateAndTime, eventData.duration, eventData.icon, eventData.color)
    }

    generateRecurringEvent (eventData) {
      return this.constructRecurring.createEvent(eventData.id, eventData.title, eventData.dateAndTime, eventData.duration, eventData.icon, eventData.color)
    }

    // accepts an event object id, deleting it
    deleteEvent = (targetId) => {
      // filter out the targeted event from the events list
      const newEvents = events.filter((event) => event.id !== targetId)
      globalContext.setGlobalState((prevState) => ({ ...prevState, events: newEvents }))
    }

    // accepts an event object with the same id as an existing event, editing
    // the existing event
    editEvent = (updatedEvent) => {
      // find the already existing event
      const index = events.findIndex((event) => event.id === updatedEvent.id)

      // if the event exists, replace it in a new events list
      if (index !== -1) {
        const newEvents = [...events]
        newEvents[index] = updatedEvent
        globalContext.setGlobalState((prevState) => ({ ...prevState, events: newEvents }))
      }
    }

    // accepts a new event object, along with to option to make it recurring.
    // adds the new event to the event list
    addEvent (newEvent, recurring = false) {
      const oldEvents = [...events]

      if (recurring) {
        oldEvents.push(this.generateRecurringEvent(newEvent))
      } else {
        oldEvents.push(this.generateDefaultEvent(newEvent))
        let data = {
          schedule_name:"testing",
          event:newEvent
        };
        fetch('/add-event', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then(res => {
          console.log(res.status);
        }).catch(err => {
          console.log("Error");
        })
      }

      globalContext.setGlobalState((prevState) => ({ ...prevState, events: oldEvents }))
    }

    findTime (day, duration) {
      let currTime = day.hour(EIGHT_AM).minute(0).second(0)

      if (day.isSame(dayjs(), 'day')) {
        currTime = dayjs()
      }

      const sortedEvents = events
        .filter((event) =>
          dayjs(event.dateAndTime).isSame(currTime, 'day') &&
          (dayjs(event.dateAndTime).isAfter(currTime, 'minute') || dayjs(event.dateAndTime.isSame(currTime, 'minute')))
        )
        .sort((firstEvent, secondEvent) =>
          dayjs(firstEvent.dateAndTime).isBefore(secondEvent.dateAndTime) ? -1 : 1
        )

      for (let eventIndex = 0; eventIndex < sortedEvents.length; eventIndex++) {
        let currEventTime = sortedEvents[eventIndex].dateAndTime
        let currEventDuration = sortedEvents[eventIndex].duration
        let window = 0

        if (currEventTime.isAfter(currTime.add(duration, 'minute'))) {
          window = currEventTime.diff(currTime, 'minute')
        }

        console.log(window)

        if (window >= duration) {
          return currTime
        }

        else {
          currTime = currEventTime.add(currEventDuration, 'minute')
        }
      }

      if (currTime.hour() < EIGHT_PM) {
        return currTime
      }

      return null
    }
  }

  // record successful login
  useEffect(() => {
    console.log(loggedIn)
  }, [loggedIn])

  // instantiate single event controller
  const eventController = new EventsController()

  // display app if user is logged in
  if (loggedIn) {
    // main display
    return (
      <div className='appContainer'>
        <Header />
        {/* Button for adding events */}
        <AddEvent addEvent={eventController.addEvent} findTime={eventController.findTime}/>
        {/* Full events display */}
        <Events events={events} eventController={eventController} />
      </div>
    )
  } else {
    return <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
  }
}

export default App
