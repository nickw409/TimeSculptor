import React, { useState } from "react";
import { useContext } from 'react';
import Header from "./header";
import { Outlet } from "react-router-dom";

export const GlobalContext = React.createContext();

// the main timesculptor app, with header and body
export default function MainFrame() 
{
    // holds the event array and settings information so no data is lost during routing
    const [globalState, setGlobalState] = useState({events:[],reportFrequency:0, notificationSettings:0});

    return (
        <GlobalContext.Provider value={{globalState, setGlobalState}}>
            <Header/>
            <Outlet/>
        </GlobalContext.Provider>
    );
}