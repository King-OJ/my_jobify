import React from 'react'
import { useAppContext } from '../context/appContext'

export default function JobModal() {
  
   const {closeDeleteJobModal, deleteJobName, deleting, deleteJob} = useAppContext()

  return (
    <div id='jobModal' className='flex flex-col justify-center bottom-0 absolute p-4 top-0 min-h-full min-w-full w-96 right-0 left-0 h-40 mx-auto rounded-sm shadow-md bg-grey50 '>
        <h5 className='text-xl tracking-widest text-center text-black'>Are you sure you want to delete <span className='font-bold'>{deleteJobName}</span> job?</h5>
        <div className="mt-6 space-x-4 flex justify-center">
          <button onClick={()=> deleteJob()} className='bg-lightRed py-1 text-darkRed text-lg'>{deleting ? 'Deleting...' : 'Delete'}</button >
          <button onClick={()=> closeDeleteJobModal()} className='bg-lightBlue text-darkBlue py-1 text-lg '>Cancel</button>
        </div>
    </div>
  )
}
