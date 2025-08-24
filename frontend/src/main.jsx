import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
// import App from './App.jsx'
import Chat from './pages/Chat'
import Home from './pages/Home'
import DaftarPenyakit from './pages/DaftarPenyakit'
import Penyakit from './pages/Penyakit'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Error from './pages/Error'
import Dashboard from './pages/Dashboard'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />
  },{
    path: "/chat",
    element: <Chat/>,
    errorElement: <Error />
  },{
    path: "/daftar-penyakit",
    element: <DaftarPenyakit/>,
    errorElement: <Error />
  },{
    path: "/penyakit",
    element: <Penyakit/>,
    errorElement: <Error />
  },{
    path: "/sign-in",
    element: <Signin/>,
    errorElement: <Error />
  },{
    path: "/sign-up",
    element: <Signup/>,
    errorElement: <Error />
  },{
    path: "/dashboard",
    element: <Dashboard/>,
    errorElement: <Error />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
