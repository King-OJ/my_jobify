import React from 'react'
import { FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'
import links from '../utils/links'

export default function MobileMenu({toggleSidebar, closeSidebar}) {
  return (
    <div className='fixed z-40 p-8 inset-0 bg-black bg-opacity-80 lg:hidden'>
        <div className="mobile-menu">
            <div className='hover:cursor-pointer' onClick={()=>closeSidebar()}>
                <FaTimes />
            </div>
            <div className="mt-6 flex justify-center">
            <ul className="mt-16 space-y-2 w-full text-grey400">
                {links.map((link)=> {
                    const { id, path, icon, text } = link
                    return <li key={id} onClick={()=>toggleSidebar()} className=' flex justify-center py-3 hover:cursor-pointer hover:bg-grey50 hover:text-black  transition-all duration-200 group'>
                    <NavLink to={path} className={({isActive})=> isActive ? 'w-full bigMenu-links active flex justify-center' : 'flex justify-center w-full bigMenu-links'}>{icon} {text}</NavLink></li>
                })}
          
        </ul>
            </div>
        </div>
    </div>
  )
}
