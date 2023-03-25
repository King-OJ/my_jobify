import React from 'react'
import { FormRow } from '../../components'

export default function AllJobs() {
  const status = [
    'all',
    'pending',
    'approved',
    'declined',
  ]

  const type = [
    'all',
    'full time',
    'part time',
    'remote',
    'internship',
  ]
  const sort = [
    'latest',
    'oldest',
    'a - z',
    'z - a',
  ]

  function handleChange(){
    console.log('zes');
  }
  return (
    <div className='m-6'>
    <div className="w-full rounded shadow-md bg-white px-6 py-10">
      <h4>search form</h4>
      <form className='mt-8 grid sm:grid-cols-2 gap-4 md:grid-cols-3'>
        <FormRow label='search' type='text' name='search' handleChange={handleChange} value=''/>
        <FormRow label='status' name='status' handleChange={handleChange} select={true} status={status}/>
        <FormRow label='type'  name='type' handleChange={handleChange} select={true} status={type}/>
        <FormRow label='sort' name='sort' handleChange={handleChange} select={true} status={sort}/>

        <div className="mt-4 flex items-end">
          <button className='bg-lightRed rounded w-full p-2 text-center text-base font-semibold text-darkRed hover:bg-opacity-100 hover:bg-darkRed hover:text-white'>clear filters</button>
        </div>
      </form>
    </div>
  </div>
  )
}
