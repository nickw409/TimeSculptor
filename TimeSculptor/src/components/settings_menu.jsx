import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function SettingsMenu() {

    const navigate = useNavigate();

    return (
        <>
        <h1>Event Report Frequency</h1>
        <Select
          defaultValue={"Never"}
          label="Event Report Frequency"
        >
            <MenuItem value={"Never"}>Never</MenuItem>
            <MenuItem value={"Daily"}>Daily</MenuItem>
            <MenuItem value={"Weekly"}>Weekly</MenuItem>
            <MenuItem value={"Monthly"}>Monthly</MenuItem>
        </Select>

        <h1>Notification Settings</h1>
        <Select
          defaultValue={"Never"}
          label="Notification Settings"
        >
            <MenuItem value={"Off"}>Off</MenuItem>            
            <MenuItem value={"24Hrs"}>24 Hours Before</MenuItem>
            <MenuItem value={"2Hrs"}>2 Hours Before</MenuItem>
            <MenuItem value={"1Hr"}>1 Hour Before</MenuItem>
            <MenuItem value={"30Min"}>30 Minutes Before</MenuItem>
            <MenuItem value={"10Min"}>10 Minutes Before</MenuItem>
            <MenuItem value={"5Min"}>5 Minutes Before</MenuItem>
        </Select>
        <p/>
        <Button 
        onClick={() => navigate('/')}
        variant="contained"
        sx = {{
            backgroundColor: '#F0EAD6',
            color: 'black'
        }}>
            Save
        </Button>
        </>
    );
}