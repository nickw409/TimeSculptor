const express = require('express');
const path = require('path');

const app = express();
const port = 9696;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`React Server Listening On Port: ${port}`);
});