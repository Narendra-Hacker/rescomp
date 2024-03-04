import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Components/Header'

const HomePage = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default HomePage
