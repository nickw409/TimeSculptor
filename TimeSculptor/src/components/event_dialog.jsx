import React from "react";
import { useState } from "react";
import { Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

// This is the dialog box component, 
// NOTE: addEvent method has been passed in, but not used yet
// NOTE: close button is working, submit button has no functionality
export default function EventDialog({open, closeFunction, addEvent})
{
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
                />
                <TextField
                // text field for event date
                    id="date"
                    label="Date"
                    variant="filled"
                />
                <TextField
                // text field for event time
                    id="time"
                    label="Time"
                    variant="filled"
                />
            </DialogContent>
            <DialogActions>
                <Button>Submit</Button>
                <Button onClick={() => closeFunction()}>Close</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}
