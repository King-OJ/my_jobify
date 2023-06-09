import React, { useReducer, useContext, createContext, useEffect } from 'react';
import axios from 'axios';
import { CANCEL_DELETE_JOB, CHANGE_PAGE, CLEAR_ALERT, CLEAR_FORM_INPUTS, CREATE_JOB_BEGIN, CREATE_JOB_ERROR, CREATE_JOB_SUCCESS, DELETE_JOB_BEGIN, DELETE_JOB_SUCCESS, GETALLJOBS_BEGIN, GETALLJOBS_ERROR, GETALLJOBS_SUCCESS, GET_CURRENT_USER_BEGIN, GET_CURRENT_USER_SUCCESS, HANDLE_FORM_CHANGE, LOGIN_USER_BEGIN, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, LOGOUT_USER, REGISTER_USER_BEGIN, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS, SET_DELETE_JOB, SET_EDIT_JOB, SHOW_ALERT, SHOW_STATS_BEGIN, SHOW_STATS_SUCCESS, UPDATE_JOB_BEGIN, UPDATE_JOB_ERROR, UPDATE_JOB_SUCCESS, UPDATE_USER_BEGIN, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS } from './actions';
import reducer from './reducers';

export const initialState = {
    userLoading: true,
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: null,
    userLocation: '',
    jobLocation: '',
    isEditing: false,
    editJobId: '',
    isDeleting: false,
    deleting: false,
    editing: false,
    deleteJobName: '',
    deleteJobId: '',
    company: '',
    position: '',
    jobType: 'full-time',
    status: 'pending',
    jobs: [],
    totalJobs: null,
    numOfPages: null,
    page: 1,
    stats: {},
    monthlyApplications: [],
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest'

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
    // authFetch.interceptors.request.use((config)=> {
    //     config.headers['Authorization'] = `Bearer ${state.token}`
    //     return config
    // },(error)=> {
    //     return Promise.reject(error)
    // })

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

    async function getCurrentUser (){
        dispatch({ type: GET_CURRENT_USER_BEGIN })
        try {
            const { data } = await authFetch.get('/auth/getCurrentUser')
            const {user, location } = data
           dispatch({ type:GET_CURRENT_USER_SUCCESS, payload:{ user, location} })
        } catch (error) {
            if(error.response.status === 401) return;
            logoutUser()
        }
    }

    useEffect(() => {
        getCurrentUser();
      }, []);

    async function registerUser(currentUser){
        dispatch({type:REGISTER_USER_BEGIN })
        try {
        const resp = await axios.post('/api/v1/auth/register', currentUser)
        const user = resp.data.user
        const location = resp.data.location
       
        dispatch({type:REGISTER_USER_SUCCESS, payload: { user, location}})

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
        const user = resp.data.user
        const location = resp.data.location
       
        dispatch({type:LOGIN_USER_SUCCESS, payload: { user, location}})

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

           const {user, location } = data
           dispatch({ type:UPDATE_USER_SUCCESS, payload:{ user, location} })
           displayAlert('Profile successfully updated!', 'success')
        } 

        catch (error) {
            error.response.status === 401 ? displayAlert(`${error.response.data.msg}! Logging out!`, 'error') : displayAlert(`${error.response.data.msg}!!`, 'error');
            dispatch({type:UPDATE_USER_ERROR })
        }
    }
    
    async function logoutUser(){
        await authFetch.get('/auth/logout')
        dispatch({type: LOGOUT_USER})
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
        dispatch({type: UPDATE_JOB_SUCCESS })
        displayAlert('Job has been successfully edited!', 'success')
        
        } catch (error) {
            console.log(error);
            error.response.status === 401 ? displayAlert(`${error.response.data.msg}! Logging out!`, 'error') : displayAlert(`${error.response.data.msg}!!`, 'error');
            dispatch({type: UPDATE_JOB_ERROR })
        }
    }

    //all jobs page
    async function getAllJobs(){
        const { search, searchStatus, searchType, sort, page } = state;
        let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`

        if (search) {
            url = url + `&search=${search}`;
          }
          
        dispatch({type:GETALLJOBS_BEGIN})
        try {
            const { data } = await authFetch.get(url)
            dispatch({type: GETALLJOBS_SUCCESS, payload:{ jobs: data.jobs, totalJobs: data.totalJobs, numOfPages: data.numOfPages}})
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

    function changePage(page){
        dispatch({type: CHANGE_PAGE, payload: page})
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
    showStats,
    changePage,
    getCurrentUser
    }}>{children}</AppContext.Provider>
}

export function useAppContext(){
    return useContext(AppContext)
}