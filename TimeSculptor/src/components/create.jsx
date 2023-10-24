import React from 'react';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import EventDialog from './event_dialog';
import { useState } from 'react';

export default function AddEvent( {addEventFunction} ) { 

    // useState that opens the event dialog component when the state is changed
    const [eventDialogOpen, setEventDialogOpen] = useState(false);

    // passed into the event_dialog component below in order to close the dialog component
    function closeDialog()
    {
        setEventDialogOpen(false);
    }

    // when the button is clicked, the dialog component is opened
    return (
        <Box justifyContent="center" alignItems="center" display="flex" border = "1px solid red" height = "100px" width = "100vw" marginTop="75px">
            <Button variant="contained"
            onClick={() => setEventDialogOpen(true)}
            sx = {{
                backgroundColor: '#F0EAD6',
                color: 'black'
            }}>
                Add Event
            </Button>
            <EventDialog open={eventDialogOpen} closeFunction={closeDialog} addEvent={addEventFunction}/>
        </Box>
    )
}