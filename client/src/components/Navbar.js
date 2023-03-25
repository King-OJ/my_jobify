import React, { useState } from 'react'
import logo from '../assets/images/logo.svg'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';

export default function Navbar({toggleSidebar}) {
  const [logout, setLogout] = useState(false)
  const { logoutUser, user } = useAppContext()

  return (
    <nav className='z-10'>
      <div className="nav">
        <div className='hover:cursor-pointer' onClick={()=>toggleSidebar()}>
          <FaAlignLeft />
        </div>

        <div>
          <img src={logo} alt="" className='w-28 lg:hidden' />
          <h3 className=' hidden lg:block'>Dashboard</h3>
        </div>

        <div className='relative'>
          <button className="user-btn " onClick={()=>setLogout(!logout)}>
            <FaUserCircle /> {user?.name} <FaCaretDown  />
          </button>
          {logout && <button className="logout-btn" onClick={()=>{logoutUser()}}>logout</button>}
        </div>
      </div>
    </nav>
  )
}
