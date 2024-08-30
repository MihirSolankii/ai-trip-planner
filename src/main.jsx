import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import ToggleColorMode from './theme/ToggleColorMode.jsx'
import Header from './components/custom/Header.jsx'
import { ThemeProvider } from './theme/ThemeProvider.jsx'
import { Toaster } from "@/components/ui/toaster"
import BookRideButton from './view-trip/bookride.jsx'

import { GoogleOAuthProvider } from '@react-oauth/google';
import Create from './create-trip/index1.jsx'
import ViewTrip from './view-trip/[tripId]/Index.jsx'
import MyTrips from './my-trips/index.jsx'
import PaymentOptionsPage from './components/custom/Payement.jsx'
import Checkout from './components/custom/update-count.jsx'


const router=createBrowserRouter([
  {
    path: "/",
    element: <App />
  
  },{
    path:"/create-trip",
    element:<CreateTrip/>
  },
  {
    path:"/view-trip/:tripId",
    element:<ViewTrip/>
  },
  {
  path:"/my-trips",
  element:<MyTrips/>
  },
  {
    path:"/payment",
    element:<PaymentOptionsPage/>
  },
{
  path:"/update-trip-count",
  element:<Checkout/>
}
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="727664539234-ob01dph7468i0fq9rqckb98oeod6aos7.apps.googleusercontent.com">
      <ToggleColorMode>
  <Header/>
  <Toaster />
    <RouterProvider router={router}/>
    </ToggleColorMode>
    </GoogleOAuthProvider>
  </StrictMode>,
)
