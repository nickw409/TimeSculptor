import React from "react";
import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';

export default function EditDialog({open, closeFunction, editEvent, toEdit})
{
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    useEffect(() => {
        setName(toEdit.title);
        setDate(toEdit.date);
        setTime(toEdit.time);
    }, [toEdit]);

    const nameChange = (event) => {
        setName(event.target.value);
    };

    const dateChange = (event) => {
        setDate(event.target.value);
    };

    const timeChange = (event) => {
        setTime(event.target.value)
    };

    const formSubmit = () => {
        const newEvent = {
            id: toEdit.id,
            title: name,
            date: date,
            time: time,
            icon: "/assets/images/login.png"
        }

        editEvent(newEvent);

        closeFunction();
    };

    return (
        <>
            <Dialog open={open}>
                <DialogTitle>Edit an Event</DialogTitle>
                <DialogContent>
                    <TextField
                    // text field for event name
                        id="eventName"
                        label="Event Name"
                        fullWidth
                        variant="filled"
                        value = {name}
                        onChange={nameChange}
                    />
                    <TextField
                    // text field for event date
                        id="date"
                        label="Date"
                        variant="filled"
                        value={date}
                        onChange={dateChange}
                    />
                    <TextField
                    // text field for event time
                        id="time"
                        label="Time"
                        variant="filled"
                        value={time}
                        onChange={timeChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick = {formSubmit}> Submit </Button>
                    <Button onClick={() => closeFunction()}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}