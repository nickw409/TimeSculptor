import React from "react";
import { useState } from "react";
import { Dialog, DialogTitle, DialogActions} from "@mui/material";
import { Button } from "@mui/material";

export default function DeleteWarning({open, close, deleteEvent, toDelete}){
    const formSubmit = (confirm) => {
        if (confirm) {
            deleteEvent(toDelete.id)
        }    

        close()
    }

    return (
        <>
            <Dialog open = {open}>
                <DialogTitle>Do you want to delete "{toDelete.title}"?</DialogTitle>
                <DialogActions>
                    <Button onClick = {() => formSubmit(true)}>Confirm</Button>
                    <Button onClick = {() => formSubmit(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}