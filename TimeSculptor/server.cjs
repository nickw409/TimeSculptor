const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const port = 9696;
let loggedIn = false;

/*  IMPORTANT
      Storing the password for the database in code that is public is a very
      dumb thing to do. I am only doing it here because this is a development
      database and as such does not matter. The dev user has reduced privileges
      and is set up for local database stuff only. Before set to production this
      needs to be changed to a production user and credentials stored elsewhere.
*/
const dbPool = mysql.createPool({
  host: 'localhost',
  user: 'dev',
  password: 'TimeSculptor',
  database: 'dev_db',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections
  idleTimeout: 30000, // 30 sec idle timeout
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.post("/add-event", (req, res) => {
  try {
    let schedule_name = req.body.schedule_name;
    let id = req.body.id;
    let event = JSON.stringify(req.body.event);
    addEvent(schedule_name, id, event).then(() => {
      console.log("Successfully added event");
      res.sendStatus(200);
    }).catch((err) => {
      console.log("Bad data");
      res.sendStatus(400);
    })
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
})

app.get("/get-event", (req, res) => {
  try {
    let id = req.query?.id;
    console.log(typeof (id));
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

app.get("/status", (req, res) => {
  const status = { "Status": true };
  res.json(status);
});

app.listen(port, () => {
  console.log(`React Server Listening On Port: ${port}`);
});

async function addEvent(schedule_name, id, event) {
  return new Promise((resolve) => {
    if (schedule_name != null && id != null && event != null) {
      let sqlString = 'INSERT INTO Event VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE ?? = ?, ?? = ?, ?? = ?;'
      let inserts = [
        schedule_name,
        id,
        event,
        'schedule_name',
        schedule_name,
        'id',
        id,
        'event',
        event
      ];
      sqlString = mysql.format(sqlString, inserts);
      console.log(sqlString);

      dbPool.query(sqlString,
        (err, results, fields) => {
          if (err) {
            throw err;
          }
          else if (results.affectedRows > 0) {
            console.log("Event inserted");
            resolve(0);
          }
      })
    }
    else {
      console.log("Bad Data");
      reject(1);
    }
  })
}

async function authUser(username, password) {
  return new Promise((resolve, reject) => {
    let token = {
      "User": null,
      "Auth": false
    };

    console.log(username, password);

    let credentialQuery = 'SELECT ?? FROM ?? WHERE ?? = ? AND ?? = ?';
    let inserts = [
      'username',
      'Credential',
      'username',
      username,
      'password',
      password];

    credentialQuery = mysql.format(credentialQuery, inserts);

    dbPool.query(credentialQuery,
      (err, results, fields) => {
        if (err) {
          throw err;
        }
        if (results.length == 0) {
          reject("Username or Password did not match");
        }
        else if (results[0].username !== undefined) {
          token.User = results[0].username;
          token.Auth = true;
          resolve(token);
        }
      })
  })
}

async function getEvent(id) {
  return new Promise((resolve, reject) => {
    let event = 'empty';

    let credentialQuery = "SELECT ?? FROM ?? WHERE ??='?'";
    let inserts = [
      'event',
      'Event',
      'id',
      id];

    credentialQuery = mysql.format(credentialQuery, inserts);
    console.log(credentialQuery);

    dbPool.query(credentialQuery,
      (err, results, fields) => {
        if (err) {
          throw err;
        }
        if (results.length == 0) {
          reject("Event is not in database");
        }
        else if (results[0].event !== undefined) {
          event = results[0].event;
          resolve(event);
        }
      })
  })
}