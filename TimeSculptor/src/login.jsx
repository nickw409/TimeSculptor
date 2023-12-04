import React, { useState } from 'react'
import './login.css'

async function loginUser (credentials) {
  return fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(data => data.json()).then(data => {
    return data
  }).catch(err => {
    console.log('Error fetching token:', err)
  })
}

export default function Login ({ loggedIn, setLoggedIn }) {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const auth_token = await loginUser({
      username,
      password
    })
    setLoggedIn(auth_token.Auth)
    setUserName('')
    setPassword('')

    // Stores auth_token locally.
    sessionStorage.setItem("auth_token", auth_token)
  }
  return (
    <div className='login-wrapper'>
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input
            type='text'
            value={username}
            onChange={e => {
              setUserName(e.target.value)
            }}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            className='password-box'
            type='password'
            value={password}
            onChange={e => {
              setPassword(e.target.value)
            }}
          />
        </label>
        <div className='submit-button'>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}
