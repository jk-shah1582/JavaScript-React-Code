import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout'
import Home from './components/home/Home'
import AboutUs from './components/aboutus/AboutUs'
import ContactUs from './components/contactus/ContactUs'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="aboutus" element={<AboutUs />} />
      <Route path="contactus/:id" element={<ContactUs />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)