import React from 'react'
import { Link } from 'react-router-dom'
import errorImg from '../assets/images/not-found.svg'

export default function Error() {
  return (
    <main>
      <div className="main-container flex flex-col justify-center items-center">
        <div className='mb-2'>
          <img src={errorImg} alt="" className='h-80 p-4' />
        </div>
        <div className="space-y-4 text-center">
          <h3>oh! page not found</h3>
          <div className="text-grey600 ">We can't seem to find the page you're looking for</div>
          <Link to='/' className='text-primary500 underline block hover:shadow-none underline-offset-4'>Back Home</Link>
        </div>
      </div>
    </main>
  )
}
