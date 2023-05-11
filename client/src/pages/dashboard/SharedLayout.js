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
    <main className='w-screen'>
      <div className="relative my-0 flex flex-row w-full">
        {isSidebarOpen && <MobileMenu toggleSidebar={toggleSidebar} closeSidebar={closeSidebar}/>}
        <BigSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={isSidebarOpen ? 'fixed lg:w-[80%] lg:left-[20%] top-0 bottom-0 overflow-y-auto transition-all': 'fixed w-full inset-0 overflow-y-auto left-0 h-full transition-all'}>
          <Navbar toggleSidebar={toggleSidebar} />
          <Outlet />
        </div>
      </div>
    </main>
  )
}
