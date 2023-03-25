import React, { useState } from 'react'
import { Alert, FormRow } from '../../components'
import { useAppContext } from '../../context/appContext'

export default function Profile() {
  const { user, showAlert, isLoading, updateUser, displayAlert } = useAppContext()

  const [currentUser, setCurrentUser] = useState({
    name: user?.name,
    lastName: user?.lastName,
    email: user?.email,
    location: user?.location,
  })

  function handleChange(e){
    const name = e.target.name
    const value = e.target.value
    setCurrentUser({...currentUser, [name]: value})
  }

  function handleSubmit(e){
    e.preventDefault()
    const {name, lastName, email, location} = currentUser
    if(!name || !lastName || !email || !location){
      displayAlert('Please provide all values!', 'error');
      return
    }
    updateUser(currentUser)
  }

  return (
    <div className='m-6'>
      <div className="w-full rounded shadow-md bg-white px-6 py-10">
        <h4>profile</h4>
        {showAlert && <Alert/>}
        <form onSubmit={handleSubmit} className='mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3'>
          <FormRow label='name' type='text' name='name' handleChange={handleChange} value={currentUser.name}/>
          <FormRow label='last name' type='text' name='lastName' handleChange={handleChange} value={currentUser.lastName}/>
          <FormRow label='email' type='email' name='email' handleChange={handleChange} value={currentUser.email}/>
          <FormRow label='location' type='text' name='location' handleChange={handleChange} value={currentUser.location}/>
          <div className="mt-4 flex items-end">
            <button disabled={isLoading} onClick={handleSubmit} className='bg-primary500 rounded w-full p-2 text-center text-base font-semibold text-white'>save changes</button>
          </div>
        </form>
      </div>
    </div>
  )
}
