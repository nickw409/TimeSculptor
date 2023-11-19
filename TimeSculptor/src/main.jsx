import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import MainFrame from './components/main_frame.jsx';
import SettingsMenu from './components/settings_menu.jsx';

const router = createBrowserRouter([
  { path: "/",
    element: <MainFrame />,
    children:[
      {index: true,
      path: "/",
      element: <App/>},
      {path: "settings",
      element: <SettingsMenu/>}]
    },
]
  
  )

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);