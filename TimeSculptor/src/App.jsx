import { useState } from 'react'
import Header from './components/header'
import AddEvent from './components/create'
import Events from './components/events'
import './App.css'

// for testing purposes this is used to populate list initially
const initialEvents = [
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
  },

]

function App() {
  // this useState dynamically updates our list of events
  // when a new event is added
  const [events, setEvents] = useState(initialEvents);
  const [count, setCount] = useState(0)

  // addEvent takes the array of events and updates it with the new event
  function addEvent( newEvent ) {
    const oldEvents = [...events];
    oldEvents.push(newEvent);
    setEvents(oldEvents);
  }

  // main display
  return (
    <div className='appContainer'>
      <Header />
      <AddEvent addEventFunction={addEvent}/>
      <Events events={events} />
    </div>
  )
}


export default App
