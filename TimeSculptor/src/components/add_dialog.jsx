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

// define defaul function
// parameters:
//  open: open function for the dialog
//  close: close function for the dialog
//  addEvent: adds an event to the user's associated events
export default function AddDialog({ open, close, addEvent }) {
    
    // set the fields to be entered in the dialog
    const [name, setName] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [color, setColor] = useState("#029356");
    const [icon, setIcon] = useState("");

    // create a unique id for the event to be added using uuid
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

    const iconChange = (event) => {
        setIcon(event.target.value);
    }
    
    // on submitting, creates event object, adds event, then closes dialog
    const formSubmit = () => {
        if(!dateTime){
            alert('Please select a date for the event.');
            return;
        }

        const newEvent = {
            id: unique_id,
            title: name,
            dateAndTime: dateTime,
            color: color,
            icon: icon
        }

        addEvent(newEvent);

        close();
    };

    return (
        <>
            {/* Define dialog */}
            <Dialog 
                open={open} 
                maxWidth="md" 
                fullWidth={true} 
                className = "popupMenu"
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
                    <TextField
                        id="icon"
                        select
                        label="Icon"
                        variant="filled"
                        value={icon}
                        onChange={iconChange}
                        sx={{width: "50%"}}
                    >
                        <MenuItem value="/assets/images/Fitness.png">Fitness</MenuItem>
                        <MenuItem value="/assets/images/Work.png">Work</MenuItem>
                        <MenuItem value="/assets/images/Sleep.png">Sleep</MenuItem>
                        <MenuItem value="/assets/images/Social.png">Social</MenuItem>
                        <MenuItem value="/assets/images/Write.png">Write</MenuItem>
                        <MenuItem value="/assets/images/Entertain.png">Entertain</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={formSubmit}> Submit </Button>
                    <Button onClick={() => close()}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
