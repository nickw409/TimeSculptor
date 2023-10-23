import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar"; 
import Toolbar from "@mui/material/Toolbar"; 
import Typography from "@mui/material/Typography"; 
import Button from "@mui/material/Button"; 
import IconButton from "@mui/material/IconButton"; 

import Logo from '../assets/tslogotransparent.png';
import Login from '../assets/login.png'
import Register from '../assets/register.png'

export default function Header() {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#F0EAD6', 
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" sx={{ position: 'fixed', top: 0, width: '100%', left: 0, zIndex: 1 }}> 
                <Toolbar> 
                    {/* <Link to="/landing"> */}
                        <IconButton 
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            // sx={{ mr: 2 }} 
                            
                        >        
                            <img src={Logo} alt="TimeSculptor" width="60" height="40" />
                        </IconButton> 
                    {/* </Link> */}
                    
                    <Typography variant="h6" 
                        component="div" sx={{ flexGrow: 1, fontWeight: 'bold'}}> 
                        Time Sculptor
                    </Typography> 

                    {/* <img src={Login} alt="Login" width="30" height="30" />
                    <Button color="inherit">Log in</Button>  
                        <img src={Register} alt="Register" width="30" height="30" />
                    <Button color="inherit" sx={{ paddingRight: '10px' }}>Sign up</Button>  */}
                </Toolbar> 
            </AppBar>
        </ThemeProvider>
    )
}