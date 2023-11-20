const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const port = 9696;
let loggedIn = false;

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());

app.post("/login", (req, res) => {
  try {
    let username = req.body?.username;
    let password = req.body?.password;
    try {
      authUser(username, password).then((token) => {
        console.log(token);
        res.json(token);
      }).catch((e) => {
        console.error(e);
        res.json({ "User": null, "Auth": false });
      })
    } catch (e) {
      console.error(e);
    }
  } catch (e) {
    console.error(e);
  }
});

app.get("/get-event", (req, res) => {
  try {
    let id = parseInt(req.query?.id);
    console.log(typeof(id));
    getEvent(id).then((event) => {
      console.log(event);
      res.json(event);
    }).catch((e) => {
      console.error(e);
    })
  } catch (e) {
    console.error(e);
  }
});

app.get("/status", (req, res) => {
  const status = { "Status": true };
  res.json(status);
});

app.listen(port, () => {
  console.log(`React Server Listening On Port: ${port}`);
});

async function authUser(username, password) {
  return new Promise((resolve, reject) => {
    let token = {
      "User": null,
      "Auth": false
    };

    /*IMPORTANT
      Storing the password for the database in code that is public is a very
      dumb thing to do. I am only doing it here because this is a development
      database and as such does not matter. The dev user has reduced privileges
      and is set up for local database stuff only. Before set to production this
      needs to be changed to a production user and credentials stored elsewhere.
    */
    let dbConnection = mysql.createConnection({
      host: "localhost",
      user: "dev",
      password: "TimeSculptor",
      database: "dev_db"
    });

    dbConnection.connect((err) => {
      if (err) throw err;
      console.log("Connected to database");
    });

    let credentialQuery = 'SELECT ?? FROM ?? WHERE ?? = ? AND ?? = ?';
    let inserts = [
      'username',
      'Credential',
      'username',
      username,
      'password',
      password];

    credentialQuery = mysql.format(credentialQuery, inserts);

    dbConnection.query(credentialQuery,
      (err, results, fields) => {
        if (err) {
          throw err;
        }
        if (results.length == 0) {
          dbConnection.end();
          reject("Username or Password did not match");
        }
        else if (results[0].username !== undefined) {
          token.User = results[0].username;
          token.Auth = true;
          dbConnection.end();
          resolve(token);
        }
      })
  })
}

async function getEvent(id) {
  return new Promise((resolve, reject) => {
    let event = 'empty';

    let dbConnection = mysql.createConnection({
      host: "localhost",
      user: "dev",
      password: "TimeSculptor",
      database: "dev_db"
    });

    dbConnection.connect((err) => {
      if (err) throw err;
      console.log("Connected");
    });

    let credentialQuery = "SELECT ?? FROM ?? WHERE ??='?'";
    let inserts = [
      'event',
      'Event',
      'id',
      id];

    credentialQuery = mysql.format(credentialQuery, inserts);
    console.log(credentialQuery);

    dbConnection.query(credentialQuery,
      (err, results, fields) => {
        if (err) {
          throw err;
        }
        if (results.length == 0) {
          dbConnection.end();
          reject("Event is not in database");
        }
        else if (results[0].event !== undefined) {
          dbConnection.end();
          event = results[0].event;
          resolve(event);
        }
      })
  })
}