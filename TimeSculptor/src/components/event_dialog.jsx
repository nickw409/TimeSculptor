import React from "react";
import { useState } from "react";
import { Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const AMorPM = [
    {
        value: "Morning",
        label: "AM",
    },

    {
        value: 'Afternoon',
        label: "PM",
    }
];

export default function EventDialog({open, closeFunction, addEvent})
{
    return (
        <>
        <Dialog open={open}>
            <DialogTitle>Add an Event</DialogTitle>
            <DialogContent>
                <TextField
                    id="eventName"
                    label="Event Name"
                    fullWidth
                    variant="filled"
                />
                <TextField
                    id="date"
                    label="Date"
                    variant="filled"
                />
                <TextField
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
