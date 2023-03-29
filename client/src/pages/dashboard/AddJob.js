import React from 'react'
import { Alert, FormRow } from '../../components'
import { useAppContext } from '../../context/appContext';

export default function AddJob() {

  const jobOptions = [
    'full-time',
    'part-time',
    'remote',
    'internship',
  ]

  const statusOptions = [
    'pending',
    'approved',
    'declined',
  ]

  const { 
    jobLocation, 
    company, 
    position, 
    isEditing, 
    showAlert, 
    displayAlert, 
    handleFormChange,
    createJob,
    clearFormInputs,
    editing,
    jobType,
    status,
    updateJob,
    isLoading
   } = useAppContext()

  function handleChange(e){
    const name = e.target.name
    const value = e.target.value
    handleFormChange(name, value);
  }

  function handleSubmit(e){
    e.preventDefault()
    if (!position || !company || !jobLocation) {
      displayAlert('Please fill out all fields!', 'error');
      return;
    }
    if(isEditing){
      updateJob()
      return;
    }
    createJob()
  }

  return (
    <div className='m-6'>
    <div className="w-full rounded shadow-md bg-white px-6 py-10">
      <h4>{isEditing ? 'edit job' : 'add job'}</h4>
      {showAlert && <Alert/>}
      <form className='mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3' onSubmit={handleSubmit}>
        <FormRow label='company' type='text' name='company' handleChange={handleChange} value={company}/>
        <FormRow label='position' type='text' name='position' handleChange={handleChange} value={position}/>
        <FormRow label='job location' type='text' name='jobLocation' handleChange={handleChange} value={jobLocation}/>
        <FormRow label='job type' name='jobType' handleChange={handleChange} select={true} value={jobType} jobType={jobOptions}/>
        <FormRow label='status' name='status' handleChange={handleChange} select={true} value={status} status={statusOptions}/>
        
        <div className="mt-4 grid grid-cols-2 gap-1 items-end">
          <button disabled={isLoading || editing} type='submit' onClick={handleSubmit} className='bg-primary500 rounded p-2 text-center text-base font-semibold text-white'>{isEditing ? 'save changes':'create job'}</button>
          <button disabled={isLoading || editing} type='button' onClick={()=>clearFormInputs()} className='bg-grey500 rounded p-2 text-center text-base font-semibold text-white'>clear inputs</button>
        </div>
      </form>
    </div>
  </div>
  )
}
