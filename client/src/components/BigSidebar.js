import logo from '../assets/images/logo.svg'
import { NavLink } from 'react-router-dom'
import links from '../utils/links'

export default function BigSidebar({isSidebarOpen, toggleSidebar}) {
  
  return (
    <aside className={isSidebarOpen ? 'bigSidebar w-[20%] fixed z-20 ml-0' : 'bigSidebar -ml-[20%]' }>
      <div className="h-full bg-white pt-6 flex flex-col items-center">
        <img src={logo} alt="" />
        <ul className="mt-16 space-y-2 w-full text-grey400 ">
          {links.map((link)=> {
            const { id, path, icon, text } = link
            return <li key={id} onClick={()=>toggleSidebar()} className='flex justify-center py-3 pr-6 hover:cursor-pointer hover:bg-grey50 hover:text-black hover:pl-6 transition-all duration-200 group'>
              <NavLink to={path} className={({isActive})=> isActive ? 'w-full bigMenu-links active flex justify-center' : 'w-full bigMenu-links flex justify-center'}>{icon} {text}</NavLink></li>
          })}
          
        </ul>
      </div>
    </aside>
  )
}
