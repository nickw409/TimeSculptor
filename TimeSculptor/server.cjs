const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const { ErrorOutline } = require('@mui/icons-material');
const { fabClasses } = require('@mui/material');
const { resolve } = require('path');

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
    let event = req.body.event;
    addEvent(schedule_name, event).then((id) => {
      console.log("Successfully added event");
      res.send(id);
    }).catch((err) => {
      console.log("Bad data");
      res.sendStatus(400);
    })
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
})

app.post("/add-schedule", (req, res) => {
  try {
    let schedule_name = req.body?.schedule_name;
    let username = req.body?.username;
    addSchedule(schedule_name, username).then((result) => {
      if (result) {
        console.log("Schedule added");
        res.sendStatus(200);
      }
      else {
        console.log("Failed to add schedule");
        res.sendStatus(400);
      }
    })
  } catch (e) {
    console.error(e);
  }
})

app.get("/events", (req, res) => {
  try {
    let schedule_name = req.query?.schedule_name;
    console.log(schedule_name);
    getAllEvents(schedule_name).then((results) => {
      for (let i = 0; i < results.length; i++) {
        console.log(results[i]);
      }
      res.json(results);
    }).catch((e) => {
      console.error(e);
    })
  } catch (e) {
    console.error(e);
  }
});

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

app.post("/register", (req, res) => {
  try {
    let username = req.body?.username;
    let password = req.body?.password;

    register(username, password).then(() => {
      res.sendStatus(200);
    }).catch((e) => {
      console.error(e);
      res.sendStatus(400);
    })
  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
})

app.get("/schedules", (req, res) => {
  try {
    let username = req.query?.username;
    console.log(username);

    getSchedules(username).then((schedules) => {
      res.json(schedules);
    }).catch((e) => {
      console.error(e);
      res.sendStatus(400);
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

async function addEvent(schedule_name, event) {
  return new Promise((resolve, reject) => {
    if (validateScheduleName(schedule_name) && event != null) {
      let convertedDateAndTime = convertDateTime(event.dateAndTime);
      let sqlString = 'INSERT INTO Event VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?;'
      let inserts = [
        schedule_name,
        0,
        event.title,
        convertedDateAndTime,
        event.duration,
        event.color,
        event.icon,
        'schedule_name',
        schedule_name,
        'id',
        0,
        'title',
        event.title,
        'dateAndTime',
        convertedDateAndTime,
        'duration',
        event.duration,
        'color',
        event.color,
        'icon',
        event.icon
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
            resolve(results.insertId);
          }
        })
    }
    else {
      console.log("Bad Data");
      reject(-1);
    }
  })
}

async function addSchedule(schedule_name, username) {
  return new Promise((resolve) => {
    findSchedule(schedule_name, username).then((result) => {
      if (!result) {
        sqlString = "INSERT INTO Schedule VALUES (?, ?);";
        let inserts = [ schedule_name, username ];

        sqlString = mysql.format(sqlString, inserts);

        dbPool.query(sqlString,
          (err, results) => {
            if (err) {
              throw err;
            }
            else if (results.affectedRows > 0) {
              console.log("Schedule added");
              resolve(true);
            }
        })
      }
      else {
        resolve(false);
      }
    })
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

function convertDateTime(dateAndTime) {
  let converted = dateAndTime.substring(0, 10);
  converted = converted + " " + dateAndTime.substring(12, 19);
  return converted;
}

async function getAllEvents(schedule_name) {
  return new Promise((resolve, reject) => {
    let sqlString = "SELECT id, title, dateAndTime, color, icon FROM Event WHERE schedule_name=?";
    let inserts = [schedule_name];

    sqlString = mysql.format(sqlString, inserts);

    dbPool.query(sqlString,
      (err, results, fields) => {
        if (err) {
          throw err;
        }
        else if (results.length == 0) {
          resolve(null);
        }
        else {
          resolve(results);
        }
      })
  })
}

async function getEvent(id) {
  return new Promise((resolve, reject) => {
    let event = 'empty';

    let credentialQuery = "SELECT ?? FROM ?? WHERE ??=?;";
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

async function getSchedules(username) {
  return new Promise((resolve, reject) => {
    if (typeof(username) === "string") {
      let sqlString = "SELECT schedule_name FROM Schedule WHERE username=?;";
      let inserts = [ username ];

      sqlString = mysql.format(sqlString, inserts);

      dbPool.query(sqlString,
        (err, results) => {
          if (err) {
            throw err;
          }
          if (results.length == 0) {
            reject("No schedules found for user");
          }
          else {
            let schedules = results;
            console.log(schedules);
            resolve(schedules);
          }
        })
    }
    else {
      reject("Username is not a string");
    }
  })
}

async function register(username, password) {
  return new Promise((resolve, reject) => {
    if (typeof(username) === "string" && typeof(password) === "string") {
      let sqlString = "SELECT * FROM Credential WHERE username=?;";
      let inserts = [ username ];

      sqlString = mysql.format(sqlString, inserts);

      dbPool.query(sqlString,
        (err, results) => {
          console.log(results.length);
          if (err) {
            throw err;
          }
          else if (results.length > 0) {
            reject("Username already taken");
          }
          else {
            sqlString = "INSERT INTO Credential VALUES (?, ?);";
            inserts = [ username, password ];

            sqlString = mysql.format(sqlString, inserts);

            dbPool.query(sqlString, 
              (err, results) => {
                if (err) {
                  throw err;
                }
                else if (results.affectedRows > 0) {
                  console.log("User registered");
                  resolve(0);
                }
                else {
                  reject(1);
                }
              })
          }
        })
    }
  })
}

async function findSchedule(schedule_name, username) {
  return new Promise((resolve) => {
    if (typeof(schedule_name) === "string" && typeof(username) === "string") {
      let sqlString = "SELECT * FROM Schedule WHERE schedule_name=? AND username=?;";
      let inserts = [ schedule_name, username ];

      sqlString = mysql.format(sqlString, inserts);

      dbPool.query(sqlString,
        (err, results) => {
          if (err) {
            throw err;
          }
          else if (results.length === 0) {
            resolve(false);
          }
          else {
            resolve(true);
          }
        })
    }
  })
}

// Returns true if schedule_name found in database, else false
function validateScheduleName(schedule_name) {
  if (typeof(schedule_name) === "string") {
    let sqlString = "SELECT schedule_name FROM Schedule WHERE schedule_name=?;";
    let inserts = [schedule_name];

    sqlString = mysql.format(sqlString, inserts);

    dbPool.query(sqlString,
      (err, results => {
        if (err) {
          throw err;
        }
        if (results.length === 0) {
          return false;
        }
        else {
          return true;
        }
      }))
  }
  else {
    return false;
  }
}