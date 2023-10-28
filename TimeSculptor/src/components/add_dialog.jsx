import React from "react";
import { useState } from "react";
import { Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import { v4 as uuid } from "uuid"

// imports for date/time picker components
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// This is the dialog box component, 
// NOTE: addEvent method has been passed in, but not used yet
// NOTE: close button is working, submit button has no functionality
export default function AddDialog({open, closeFunction, addEvent})
{
    const [name, setName] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [color, setColor] = useState("");

    const unique_id = uuid();

    const nameChange = (event) => {
        setName(event.target.value);
    };

    const dateTimeChange = (date) => {
        setDateTime(date);
    };

    const colorChange = (event) => {
        setColor(event.target.value);
    }

    const formSubmit = () => {
        const newEvent = {
            id: unique_id,
            title: name,
            dateAndTime: dateTime,            
            color: color,
            icon: "/assets/images/login.png"
        }

        addEvent(newEvent);

        closeFunction();
    };

    return (
        <>
            <Dialog open={open}>
                <DialogTitle>Add an Event</DialogTitle>
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
                        id="color"
                        label="Color"
                        type="color" 
                        variant="filled"
                        value={color}
                        onChange={colorChange} 
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
