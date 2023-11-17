import React from "react";
import { useState } from "react";
import { Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import { v4 as uuid } from "uuid"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker, dateTimePickerTabsClasses } from '@mui/x-date-pickers/DateTimePicker';
import MenuItem from '@mui/material/MenuItem';
import './dialog.css'

export default function AddDialog({ open, closeFunction, addEvent }) {
    // This is the dialog box component, 
    const [name, setName] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [color, setColor] = useState("#029356");

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
            <Dialog 
                open={open} 
                maxWidth="md" 
                fullWidth={true} 
                PaperProps={{ style: { maxHeight: '80vh' , height: '80vh', maxWidth: '70vh', width: '70vh'} }}
            >
                <DialogTitle>Add an Event</DialogTitle>
                <DialogContent className ='eventDialog'>
                    <TextField
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
                            label="Event Date/Time"
                            sx={{ overflow: "visible", marginBottom: "30px", width: "60%" }}
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
                        sx={{width: "50%"}}
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
