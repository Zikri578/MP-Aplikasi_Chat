import React from 'react'
import { Routes, Route } from "react-router-dom"
import axios from 'axios'
import { useState, useEffect } from 'react'
import SplashScreen from './pages/SplashScreen'
import NotFound from "./pages/NotFound"
import Login from './pages/Login'
import Chat from './pages/Chat'


export default function App() {
  return (
    <Routes>
      <Route path='/' element={<SplashScreen />} />
      <Route path='/login' element={<Login />} />
      <Route path='/chat' element={<Chat />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
