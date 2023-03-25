import React from 'react'
import { FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'
import links from '../utils/links'

export default function MobileMenu({toggleSidebar, closeSidebar}) {
  return (
    <div className='absolute p-8 inset-0 bg-black bg-opacity-80 z-20 lg:hidden'>
        <div className="mobile-menu">
            <div onClick={()=>closeSidebar()}>
                <FaTimes />
            </div>
            <div className="mt-6 flex justify-center">
            <ul className="mt-16 space-y-2 w-full text-grey400 ">
                {links.map((link)=> {
                    const { id, path, icon, text } = link
                    return <li key={id} className='flex justify-center py-3 hover:cursor-pointer hover:bg-grey50 hover:text-black  transition-all duration-200 group'>
                    <NavLink onClick={()=>toggleSidebar()} to={path} className={({isActive})=> isActive ? 'bigMenu-links active' : 'bigMenu-links'}>{icon} {text}</NavLink></li>
                })}
          
        </ul>
            </div>
        </div>
    </div>
  )
}
