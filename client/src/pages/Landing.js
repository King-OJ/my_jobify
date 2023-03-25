import React from 'react'
import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <main>
      <div className="main-container flex flex-col">

        <header className='h-[6rem] mx-6'>
          <img src={logo} alt="" />
        </header>

        <section className='mx-6 lg:pt-40'>
          <div className="h-full flex flex-col-reverse justify-start items-center lg:flex-row">

            <div className="pb-10 lg:my-0 lg:w-1/2 space-y-8 text-center lg:text-left">
              <h1 className="font-bold text-black text-3xl md:text-5xl">Job <span className='text-primary500'>Tracking</span> App</h1>
              <p className='text-lg text-grey600'>I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue bottle single-origin coffee chia. Aesthetic post-ironic venmo, quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch narwhal.</p>
              <Link to='/register' className='inline-block text-xl rounded text-white font-semibold bg-primary500'>Login / Register</Link>
            </div>

            <div className=" lg:w-1/2 px-4">
              <img src={main} alt="" className=' h-[32rem] lg:h-auto'/>
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}
