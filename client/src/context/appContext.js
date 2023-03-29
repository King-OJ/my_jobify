import React, { useReducer, useContext, createContext } from 'react';
import axios from 'axios';
import { CANCEL_DELETE_JOB, CLEAR_ALERT, CLEAR_FORM_INPUTS, CREATE_JOB_BEGIN, CREATE_JOB_ERROR, CREATE_JOB_SUCCESS, DELETE_JOB_BEGIN, DELETE_JOB_SUCCESS, GETALLJOBS_BEGIN, GETALLJOBS_ERROR, GETALLJOBS_SUCCESS, HANDLE_FORM_CHANGE, LOGIN_USER_BEGIN, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, LOGOUT_USER, REGISTER_USER_BEGIN, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS, SET_DELETE_JOB, SET_EDIT_JOB, SHOW_ALERT, SHOW_STATS_BEGIN, SHOW_STATS_SUCCESS, UPDATE_JOB_BEGIN, UPDATE_USER_BEGIN, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS } from './actions';
import reducer from './reducers';

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')
const userLocation = localStorage.getItem('location')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token ? JSON.parse(token) : null,
    userLocation: userLocation ? JSON.parse(userLocation) : '',
    isEditing: false,
    editJobId: '',
    isDeleting: false,
    deleting: false,
    editing: false,
    deleteJobName: '',
    deleteJobId: '',
    company: '',
    position: '',
    jobLocation: userLocation ? JSON.parse(userLocation) : '',
    jobType: 'full-time',
    status: 'pending',
    jobs: [],
    totalJobs: null,
    numOfPages: null,
    stats: {},
    monthlyApplications: []
}

const AppContext = createContext()

export function AppProvider({ children }){

    const [ state, dispatch ] = useReducer(reducer, initialState)

    //method 1 setting defalt auth headers before sending requests
    // axios.defaults.headers['Authorization'] = `Bearer ${state.token}`;


    //method 2 setting defalt auth headers before sending requests
    const authFetch = axios.create({
        baseURL: '/api/v1',
        // headers: {
        //     Authorization: `Bearer ${state.token}`
        // }
    })


    //method 3 setting defalt auth headers before sending requests
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

    function addToLocalStorage(user, token, location){
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', JSON.stringify(token))
        localStorage.setItem('location', JSON.stringify(location))
    }

    function removeFromLocalStorage(){
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('location')
    }

    async function registerUser(currentUser){
        dispatch({type:REGISTER_USER_BEGIN })
        try {
        const resp = await axios.post('/api/v1/auth/register', currentUser)
        const token = resp.data.token
        const user = resp.data.user
        const location = resp.data.location
       
        dispatch({type:REGISTER_USER_SUCCESS, payload: {token, user, location}})
        addToLocalStorage(user, token, location)

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
        const location = resp.data.location
       
        dispatch({type:LOGIN_USER_SUCCESS, payload: {token, user, location}})
        addToLocalStorage(user, token, location)

        setTimeout(() => {
            clearAlert()
        }, 3000);

        } catch (error) {
            
            let text = typeof error.response.data.msg === 'object' 
            ?  
            error.response.data.msg.length > 1 ? error.response.data.msg.join(' , ') : error.response.data.msg[0]
            :
            error.response.data.msg

            dispatch({type:LOGIN_USER_ERROR })
            displayAlert(text, 'error')
        }
        
    }
    //profile page
    async function updateUser(currentUser){
        dispatch({ type:UPDATE_USER_BEGIN })

        try {
           const { data } = await authFetch.patch('/auth/updateUser', currentUser)

           const {user, token, location } = data
           dispatch({ type:UPDATE_USER_SUCCESS, payload:{token, user, location} })
           addToLocalStorage(user, token, location)
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

    //add job page
    function handleFormChange(name, value){
        dispatch({type: HANDLE_FORM_CHANGE, payload:{ name, value}})
    }

    async function createJob(){
        const job ={
            company: state.company,
            position: state.position,
            jobLocation: state.jobLocation,
            jobType: state.jobType,
            status: state.status,
        }

        dispatch({type: CREATE_JOB_BEGIN})
        try {
          
        await authFetch.post('/jobs', job) 
          
          dispatch({type: CREATE_JOB_SUCCESS})
          displayAlert('New Job Created!', 'success')
        } catch (error) {
            dispatch({type: CREATE_JOB_ERROR})
            error.response.status === 401 ? displayAlert(`${error.response.data.msg}! Logging out!`, 'error') : displayAlert(`${error.response.data.msg}!!`, 'error');
        }
    }

    function clearFormInputs(){
        dispatch({type: CLEAR_FORM_INPUTS})
    }

    function openDeleteJobModal(name, id){
        dispatch({type: SET_DELETE_JOB, payload: {name, id}})
     
    }

    function closeDeleteJobModal(){
        dispatch({type: CANCEL_DELETE_JOB})
    }

    function editJob(id){
        dispatch({type: SET_EDIT_JOB, payload: {id}})
    }

    async function deleteJob(){
        dispatch({type: DELETE_JOB_BEGIN})
        try {
            const { data } = await authFetch.delete(`/jobs/${state.deleteJobId}`)
            const {msg} = data
            dispatch({type: DELETE_JOB_SUCCESS})
            displayAlert(msg, 'success')
        } catch (error) {
            error.response.status === 401 ? displayAlert(`${error.response.data.msg}! Logging out!`, 'error') : displayAlert(`${error.response.data.msg}!!`, 'error');

        }
        closeDeleteJobModal()
        getAllJobs()
        
    }

    async function updateJob(){
        dispatch({type: UPDATE_JOB_BEGIN })
        try {
        const {  editJobId, company, position, jobLocation, jobType, status
            } = state
        const editJobDetails =   { 
            company,
            position,
            jobLocation,
            jobType,
            status
            } 
        await authFetch.patch(`/jobs/${editJobId}`, editJobDetails )
        displayAlert('Job has been successfully edited!', 'success')
        
        } catch (error) {
            console.log(error);
            error.response.status === 401 ? displayAlert(`${error.response.data.msg}! Logging out!`, 'error') : displayAlert(`${error.response.data.msg}!!`, 'error');
        }
    }

    //all jobs page
    async function getAllJobs(){
        dispatch({type:GETALLJOBS_BEGIN})
        try {
            const { data } = await authFetch.get('/jobs')
            dispatch({type: GETALLJOBS_SUCCESS, payload:{ jobs: data.jobs.reverse(), totalJobs: data.totalJobs, numOfPages: data.numOfPages}})
        } catch (error) {
            console.log(error);
            dispatch({type: GETALLJOBS_ERROR})
        }
    }

    //show stats

    async function showStats(){
        dispatch({type: SHOW_STATS_BEGIN})
        try {
            const { data } = await authFetch('/jobs/stats')
            const {defaultStats, monthlyApplications} = data
            dispatch({type: SHOW_STATS_SUCCESS, payload:{ stats: defaultStats, monthlyApplications}})
        } catch (error) {
            console.log(error.response);
        }
    }


    return <AppContext.Provider value={{
    ...state,
    displayAlert,
    registerUser,
    loginUser,
    clearAlert,
    logoutUser,
    updateUser,
    handleFormChange,
    clearFormInputs,
    createJob,
    getAllJobs,
    editJob,
    updateJob,
    openDeleteJobModal,
    closeDeleteJobModal,
    deleteJob,
    showStats
    }}>{children}</AppContext.Provider>
}

export function useAppContext(){
    return useContext(AppContext)
}