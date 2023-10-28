const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 6969;
var jsonParser = bodyParser.json();

app.use(cors({
  origin:['*'],
  credentials:true
}));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/login', jsonParser, cors(), (req, res) => {
  console.log(req.body);
  if(req.body?.username !== undefined && req.body.username === 'admin') {
    if(req.body?.password !== undefined && req.body.password === 'password') {
      res.send({
        token: 'admin'
      });
    }
  } else {
    res.send({
      token: 'failure'
    });
  }
});

app.listen(port, () => {
  console.log(`Server API listening on port: ${port}`);
});
