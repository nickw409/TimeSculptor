import React from 'react';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';

export default function AddEvent() { 
    return (
        <Box justifyContent="center" alignItems="center" display="flex" border = "1px solid red" height = "100px" width = "100vw" marginTop="75px">
            <Button variant="contained"
            sx = {{
                backgroundColor: '#F0EAD6',
                color: 'black'
            }}>
                Add Event
            </Button>
        </Box>
    )
}