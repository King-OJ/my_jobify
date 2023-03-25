import React, { useReducer, useContext, createContext } from 'react';
import axios from 'axios';
import { CLEAR_ALERT, LOGIN_USER_BEGIN, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, LOGOUT_USER, REGISTER_USER_BEGIN, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS, SHOW_ALERT, UPDATE_USER_BEGIN, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS } from './actions';
import reducer from './reducers';

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: user ? JSON.parse(token) : null,
    userLocation: '',
}

const AppContext = createContext()

export function AppProvider({ children }){

    const [ state, dispatch ] = useReducer(reducer, initialState)

    //setting defalt auth headers before sending requests
    // axios.defaults.headers['Authorization'] = `Bearer ${state.token}`;

    const authFetch = axios.create({
        baseURL: '/api/v1',
        // headers: {
        //     Authorization: `Bearer ${state.token}`
        // }
    })

    authFetch.interceptors.request.use((config)=> {
        config.headers['Authorization'] = `Bearer ${state.token}`
        return config
    },(error)=> {
        return Promise.reject(error)
    })

    authFetch.interceptors.response.use((response)=> {
        return response;
    },(error)=> {
        if(error.response.status === 401){
            setTimeout(() => {
                logoutUser()
            }, 3000)
            
        }
        return Promise.reject(error)
    })

    function displayAlert(alertText, alertType){
        dispatch({type:SHOW_ALERT, payload: {alertText, alertType} })
        setTimeout(() => {
            clearAlert()
        }, 3000);
    }

    function clearAlert(){
        dispatch({type:CLEAR_ALERT })
    }

    function addToLocalStorage(user, token){
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', JSON.stringify(token))
    }

    function removeFromLocalStorage(){
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    async function registerUser(currentUser){
        dispatch({type:REGISTER_USER_BEGIN })
        try {
        const resp = await axios.post('/api/v1/auth/register', currentUser)
        const token = resp.data.token
        const user = resp.data.user
       
        dispatch({type:REGISTER_USER_SUCCESS, payload: {token, user}})
        addToLocalStorage(user, token)

        setTimeout(() => {
            clearAlert()
        }, 3000);

        } catch (error) {
            console.log(error);
            let text = typeof error.response.data.msg === 'object' 
            ?  
            error.response.data.msg.length > 1 ? error.response.data.msg.join(' , ') : error.response.data.msg[0]
            :
            error.response.data.msg

            dispatch({type:REGISTER_USER_ERROR })
            displayAlert(text, 'error')
        }
        
    }
    
    async function loginUser(currentUser){
        dispatch({type:LOGIN_USER_BEGIN })
        try {
        const resp = await axios.post('/api/v1/auth/login', currentUser)
        const token = resp.data.token
        const user = resp.data.user
       
        dispatch({type:LOGIN_USER_SUCCESS, payload: {token, user}})
        addToLocalStorage(user, token)

        setTimeout(() => {
            clearAlert()
        }, 3000);

        } catch (error) {
            console.log(error);
            let text = typeof error.response.data.msg === 'object' 
            ?  
            error.response.data.msg.length > 1 ? error.response.data.msg.join(' , ') : error.response.data.msg[0]
            :
            error.response.data.msg

            dispatch({type:LOGIN_USER_ERROR })
            displayAlert(text, 'error')
        }
        
    }
    
    async function updateUser(currentUser){
        dispatch({ type:UPDATE_USER_BEGIN })

        try {
           const { data } = await authFetch.patch('/auth/updateUser', currentUser)

           const {user, token } = data
           dispatch({ type:UPDATE_USER_SUCCESS, payload:{token, user} })
           addToLocalStorage(user, token)
           displayAlert('Profile successfully updated!', 'success')
        } 

        catch (error) {
            error.response.status === 401 ? displayAlert(`${error.response.data.msg}! Logging out!`, 'error') : displayAlert(`${error.response.data.msg}!!`, 'error');
            dispatch({type:UPDATE_USER_ERROR })
        }
    }
    
    function logoutUser(){
        dispatch({type: LOGOUT_USER})
        removeFromLocalStorage()
    }

    return <AppContext.Provider value={{
    ...state,
    displayAlert,
    registerUser,
    loginUser,
    clearAlert,
    logoutUser,
    updateUser
    }}>{children}</AppContext.Provider>
}

export function useAppContext(){
    return useContext(AppContext)
}