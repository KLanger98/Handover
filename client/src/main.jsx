import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import "@mantine/tiptap/styles.css";
//For Resizeable image on tiptap rich text editor
import "tiptap-extension-resizable-image/styles.css";
//Import relevant pages for router
import App from './App.jsx'
//Import dashboard sub pages
import { LoginPage, SignUpPage, ProcessLibrary, 
  ApplicationPage, Dashboard, AboutPage, ErrorPage, 
  ProtectedRoute, ReferralsPage, ReferralCompPage, UserProfile, SiteInformation,
  NewReferral, IndividualProcess
} from './pages/'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: 'login',
        element: <LoginPage/>
      },
      {
        path: 'signup',
        element: <SignUpPage/>
      },
      {
        path: 'app',
        element: (
          <ProtectedRoute>
            <ApplicationPage/>
          </ProtectedRoute>
        ),
        children: [
          {
            path: "processes",
            element: <ProcessLibrary/>
          },
          {
            path: "processes/:id",
            element: <IndividualProcess/>
          },
          {
            path: "dashboard",
            element: <Dashboard/>
          },
          {
            path: "handover"
          },
          {
            path: "referrals",
            element: <ReferralsPage/>
          },
          {
            path: "referrals/:id",
            element: <ReferralCompPage />
          },
          {
            path: "site",
            element: <SiteInformation/>
          },
          {   
            path: "referrals/new",
            element: <NewReferral/>
          },
          {
            path: 'user',
            element: <UserProfile/>
          },

        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(

    <RouterProvider router={router}/>
  
)
