import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import './index.css'

//Import relevant pages for router
import App from './App.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ApplicationPage from './pages/ApplicationPage.jsx'

//Import dashboard sub pages
import ProcessLibrary from './pages/ProcessLibary.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <AboutPage/>
      },
      {
        path: 'application',
        element: <ApplicationPage/>,
        children: [
          {
            path: "processes",
            element: <ProcessLibrary/>
          },
          {
            path: "dashboard",
            element: <Dashboard/>
          },
          {
            path: "handover"
          }

        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
