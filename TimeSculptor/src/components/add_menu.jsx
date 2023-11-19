import React from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";

export default function AddMenu({ open, closeFunction }) {

    // for use during routing
    const navigate = useNavigate();

    // navigates to the settings menu when clicked
    return(
        <>
        <Menu  
            open = {open}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <MenuItem onClick={() => {closeFunction(); navigate("settings") }}> Settings </MenuItem>
        </Menu>
        </>
    );
}