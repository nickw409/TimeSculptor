const express = require('express');
const path = require('path');

const app = express();
const port = 9696;
let loggedIn = false;

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());

//app.post("/login", (req, res) => {

//})

app.get("/status", (req, res) => {
  const status = {"Status":true};
  res.json(status);
});

app.listen(port, () => {
  console.log(`React Server Listening On Port: ${port}`);
});