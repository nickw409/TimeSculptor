import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { GlobalContext } from "./main_frame";

export default function SettingsMenu() {

    const navigate = useNavigate();
    const globalContext = React.useContext(GlobalContext);

    return (
        <>
        <h1>Event Report Frequency</h1>
        <Select
          label="Event Report Frequency"
          value={globalContext.globalState.reportFrequency}
          onChange={(event)=>globalContext.setGlobalState((prevState) => ({...prevState, reportFrequency:event.target.value}))}
        >
            <MenuItem value={0}>Never</MenuItem>
            <MenuItem value={1}>Daily</MenuItem>
            <MenuItem value={2}>Weekly</MenuItem>
            <MenuItem value={3}>Monthly</MenuItem>
        </Select>

        <h1>Notification Settings</h1>
        <Select
          label="Notification Settings"
          value={globalContext.globalState.notificationSettings}
          onChange={(event)=>globalContext.setGlobalState((prevState) => ({...prevState, notificationSettings:event.target.value}))}
        >
            <MenuItem value={0}>Off</MenuItem>            
            <MenuItem value={1}>24 Hours Before</MenuItem>
            <MenuItem value={2}>2 Hours Before</MenuItem>
            <MenuItem value={3}>1 Hour Before</MenuItem>
            <MenuItem value={4}>30 Minutes Before</MenuItem>
            <MenuItem value={5}>10 Minutes Before</MenuItem>
            <MenuItem value={6}>5 Minutes Before</MenuItem>
        </Select>
        <p/>
        <Button 
        onClick={() => navigate('/')}
        variant="contained"
        sx = {{
            backgroundColor: '#F0EAD6',
            color: 'black'
        }}>
            Done
        </Button>
        </>
    );
}