import React from 'react'
import { FormRow } from '../../components'
import { useAppContext } from '../../context/appContext';

export default function AddJob() {
  function handleChange(){
    console.log('zes');
  }

  const jobType = [
    'full-time',
    'part-time',
    'remote',
    'internship',
  ]

  const status = [
    'pending',
    'approved',
    'declined',
  ]

  const { user }= useAppContext()

  return (
    <div className='m-6'>
    <div className="w-full rounded shadow-md bg-white px-6 py-10">
      <h4>Add Job</h4>
      <form className='mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <FormRow label='company' type='text' name='company' handleChange={handleChange} value=''/>
        <FormRow label='position' type='text' name='position' handleChange={handleChange} value=''/>
        <FormRow label='job location' type='text' name='job location' handleChange={handleChange} value={user?.location}/>
        <FormRow label='job type' name='job type' handleChange={handleChange} select={true} jobType={jobType}/>
        <FormRow label='status' name='status' handleChange={handleChange} select={true} status={status}/>
        
        <div className="mt-4 grid grid-cols-2 gap-1 items-end">
          <button className='bg-primary500 rounded p-2 text-center text-base font-semibold text-white'>save changes</button>
          <button className='bg-grey500 rounded p-2 text-center text-base font-semibold text-white'>clear</button>
        </div>
      </form>
    </div>
  </div>
  )
}
