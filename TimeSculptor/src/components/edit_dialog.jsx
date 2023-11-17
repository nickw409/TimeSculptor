import React from "react";
import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import './dialog.css'

// imports for date/time picker components
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function EditDialog({ open, closeFunction, editEvent, toEdit }) {
    const [name, setName] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [color, setColor] = useState("");

    useEffect(() => {
        setName(toEdit.title);
        setDateTime(toEdit.dateAndTime);
        setColor(toEdit.color);
    }, [toEdit]);

    const nameChange = (event) => {
        setName(event.target.value);
    };

    const dateTimeChange = (date) => {
        setDateTime(date.toDate());
    };

    const colorChange = (event) => {
        setColor(event.target.value);
    };

    const formSubmit = () => {
        const newEvent = {
            id: toEdit.id,
            title: name,
            dateAndTime: dateTime,
            color: color,
            icon: "/assets/images/login.png"
        }

        editEvent(newEvent);

        closeFunction();
    };

    return (
        <>
            <Dialog 
                open={open} 
                maxWidth="md" 
                fullWidth={true} 
                className="popupMenu"
            >
                <DialogTitle>Edit an Event</DialogTitle>
                <DialogContent className="eventDialog">
                    <TextField
                        // text field for event name
                        id="eventName"
                        label="Event Name"
                        fullWidth
                        variant="filled"
                        value={name}
                        onChange={nameChange}
                        sx={{marginBottom: '30px'}}
                    />
                
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            sx={{ overflow: "visible", marginBottom: "30px" }}
                            label="Event Date/Time"
                            disablePast
                            value={dateTime}
                            onChange={dateTimeChange}
                        />
                    </LocalizationProvider>

                    

                    <TextField
                        id="color"
                        select
                        label="Color"
                        type="color"
                        variant="filled"
                        value={color}
                        onChange={colorChange}
                    >
                        <MenuItem value="#029356">Green</MenuItem>
                        <MenuItem value="#009eb0">Cyan</MenuItem>
                        <MenuItem value="#0073e6">Blue</MenuItem>
                        <MenuItem value="#606ff3">Purple</MenuItem>
                        <MenuItem value="#9b8bf4">Lavender</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={formSubmit}> Submit </Button>
                    <Button onClick={() => closeFunction()}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
