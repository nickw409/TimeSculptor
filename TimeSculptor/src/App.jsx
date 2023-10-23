import { useState } from 'react'
import Header from './components/header'
import AddEvent from './components/create'
import Events from './components/events'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='appContainer'>
      <Header />
      <AddEvent />
      <Events />
    </div>
  )
}

export default App
