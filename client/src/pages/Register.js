import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
import {Alert, FormRow} from '../components'
import { useAppContext } from '../context/appContext'


export default function Register() {

  const {isLoading, showAlert, displayAlert, registerUser, user, loginUser } = useAppContext()
  const navigate   = useNavigate()

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    isMember: true
  })

  function handleChange(e){
    const name = e.target.name
    const value = e.target.value
    setNewUser({...newUser, [name]: value})
  }

  function handleSubmit(e){
    e.preventDefault()
    const {name, email, password, isMember } = newUser
   if((!isMember && (!name || !email || !password)) || (isMember && (!email || !password)) ){
    displayAlert('Please fill out all fields!', 'error');
    return
   }

   isMember ?
   loginUser({email, password})
   :
   registerUser({name, email,password})

  }

    useEffect(() => {
        if(user){
          setTimeout(() => {
            navigate('/')
        }, 3000); 
        }
        
    }, [user, navigate])
  

  return (
    <main>
      <div className="main-container flex justify-center items-center w-full">
        <form onSubmit={handleSubmit} className="w-[90%] max-w-2xl bg-white rounded-md border-t-8 border-primary500 p-8 shadow-lg">
          <div className="flex justify-center mb-8">
            <img src={logo} alt="" />
          </div>
          <h3 className="text-center text-4xl">{newUser.isMember ? 'login' : 'register'}</h3>
          {showAlert && <Alert />}
          {!newUser.isMember && <FormRow type='text' name='name' label='name' handleChange={handleChange} value={newUser.name}></FormRow>}
          <FormRow type='email' name='email' label='email' handleChange={handleChange} value={newUser.email}></FormRow>
          <FormRow type='password' name='password' label='password' handleChange={handleChange} value={newUser.password}></FormRow>

          <button type='submit' disabled={isLoading} onClick={handleSubmit} className="mt-6 bg-primary500 text-white w-full ">submit</button>
          <button type='button' disabled={isLoading} onClick={()=>loginUser({email: 'test-user@gmail.com', password: 'secret'})} className="mt-6 bg-primary800 text-white w-full ">{isLoading ? 'loading...':'view app'}</button>

          <div className="text-center mt-4">{newUser.isMember ? 'Not yet a member ?' : 'Already a member ?'} <span onClick={()=>setNewUser({...newUser, isMember: !newUser.isMember })} className='text-primary500 capitalize hover:cursor-pointer'>{newUser.isMember ? 'register' : 'login' }</span></div>

        </form>

      </div>
    </main>
  )
}
