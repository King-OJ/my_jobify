import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { BigSidebar, MobileMenu, Navbar } from '../../components'

export default function SharedLayout() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  function toggleSidebar(){
    setIsSidebarOpen(!isSidebarOpen)
  }
  function closeSidebar(){
    setIsSidebarOpen(false)
  }

  return (
    <main className='overflow-x-hidden'>
      <div className="relative h-screen my-0 flex flex-row items-start">
        {isSidebarOpen && <MobileMenu toggleSidebar={toggleSidebar} closeSidebar={closeSidebar}/>}
        <BigSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1">
          <Navbar toggleSidebar={toggleSidebar} />
          <Outlet />
        </div>
      </div>
    </main>
  )
}
