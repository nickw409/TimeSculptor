import React, {useState} from 'react';
import './login.css';

async function loginUser(credentials) {
   return fetch('/status', {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json'
      }
   }).then(data => data.json()).then(data => {
      console.log(data);
      return data;
   }).catch(err => {
      console.log("Error fetching token:", err);
   })
}

export default function Login({ loggedIn, setLoggedIn }) {
   const [username, setUserName] = useState("");
   const [password, setPassword] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();
      const status = await loginUser({
         username,
         password 
      });
      console.log(status);
      setLoggedIn(status.Status);
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