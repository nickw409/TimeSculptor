# How to retrieve data from database

## Everything should be in JSON

## Schedules

- Use the fetch api. This will be a GET request.
- Use /schedules as the access point. It expects the parameter username to be supplied.
- Look below at the example. /schedule represents the access point, everything after ? are the parameters.

e.g. localhost:9696/schedule?username=admin

- The fetch api does not need the domain part so you can leave off everything before the / since everything is running
on the same machine.

### Setting up a fetch request

- The best way to set everything up is make a string like `/schedule?username=${username}` and feed that string into fetch

e.g. fetch(urlString).then(response => response.json).then(data => {whatever you want to do with data})
(You have to do response => response.json to parse the response into json. data = response.json)

## Events

- Two ways to get events:
      - /events which uses schedule_name to grab all events linked to schedule.
      - /get-event which takes in the id of a specific event and returns it.

- Look at [link](#setting-up-a-fetch-request) for example on fetch get requests.
- /events returns a json object filled with events.

## POST Requests

- Example can be found in APP.jsx line 155

### Add Schedule

- /add-schedule
- Expects schedule_name and username IN BODY. The fetch request for a POST is different from GET.
- Does not return values like GET, instead sends statuscode 200. Check the response.statuscode for errors.

### Add Event

- /add-event
- Expects schedule_name and an event object.
- Returns the id of the added event guaranteed to be unique, use this locally or just fetch all events after
every added event, up to you.

### Login

- Look at login.jsx

### Register

- /register
- Expects username and password
- Returns statuscode 200 on success, 400 on failure. Make sure to check.
