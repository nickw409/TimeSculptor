const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 6969;
var jsonParser = bodyParser.json();

app.use(cors({
  origin:['http:enginick.com:9696', 'http://142.11.234.231:9696', 'http://localhost:9696'],
  credentials:true
}));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/login', jsonParser, cors(), (req, res) => {
  console.log(req.body);
  if(req.body?.username !== undefined && req.body.username === 'admin') {
    if(req.body?.password !== undefined && req.body.password === 'password') {
      res.setHeader('Access-Control-Allow-Origin', "*");
      res.setHeader('Access-Control-Allow-Headers', true);
      res.setHeader('Access-Control-Allow-Credentials', true);
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
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
