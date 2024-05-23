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
  ProtectedRoute, ReferralsPage, ReferralCompPage, UserProfile
} from './pages/'


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
        path: 'signup',
        element: <SignUpPage/>
      },
      {
        path: 'login',
        element: <LoginPage/>
      },
      {
        path: 'user',
        element: <UserProfile/>
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
          }

        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(

    <RouterProvider router={router}/>
  
)
