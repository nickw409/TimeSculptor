import React, {useState} from 'react';
import { PropTypes } from 'prop-types';
import './login.css';

async function loginUser(credentials) {
   return fetch('http://localhost:6969/login', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
   }).then(data => data.json()).catch(err => {
      console.log("Error fetching token:", err);
   })
}

export default function Login({ setToken }) {
   const [username, setUserName] = useState("");
   const [password, setPassword] = useState("");

   const handleSubmit = async e => {
      e.preventDefault();
      const token = await loginUser({
         username,
         password 
      });
      setToken(token);
      setUserName("");
      setPassword("");
   }
   return(
      <div className="login-wrapper">
         <h1>Please Log In</h1>
         <form onSubmit={handleSubmit}>
            <label>
               <p>Username</p>
               <input type="text" value={username} onChange={e => {
                  setUserName(e.target.value) 
               }} />
            </label>
            <label>
               <p>Password</p>
               <input type="password" value={password} onChange={e => {
                  setPassword(e.target.value) 
               }} />
            </label>
            <div>
               <button type="submit">Submit</button>
            </div>
         </form>
      </div>
   )
}

Login.propTypes = {
   setToken: PropTypes.func.isRequired
}