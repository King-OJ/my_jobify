import { CANCEL_DELETE_JOB, CHANGE_PAGE, CLEAR_ALERT, CLEAR_FORM_INPUTS, CREATE_JOB_BEGIN, CREATE_JOB_ERROR, CREATE_JOB_SUCCESS, DELETE_JOB_BEGIN, DELETE_JOB_ERROR, DELETE_JOB_SUCCESS, GETALLJOBS_BEGIN, GETALLJOBS_ERROR, GETALLJOBS_SUCCESS, GET_CURRENT_USER_BEGIN, GET_CURRENT_USER_SUCCESS, HANDLE_FORM_CHANGE, LOGIN_USER_BEGIN, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, LOGOUT_USER, REGISTER_USER_BEGIN, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS, SET_DELETE_JOB, SET_EDIT_JOB, SHOW_ALERT, SHOW_STATS_BEGIN, SHOW_STATS_SUCCESS, UPDATE_JOB_BEGIN, UPDATE_JOB_ERROR, UPDATE_JOB_SUCCESS, UPDATE_USER_BEGIN, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS } from "./actions";

export default function reducer(state, action) {
    switch (action.type) {
        case SHOW_ALERT:
            const { alertType, alertText } = action.payload
          return {
            ...state,
            showAlert: true,
            alertType,
            alertText
          }  
        
        case CLEAR_ALERT: 
          return {
            ...state,
            showAlert: false,
            alertText: '',
            alertType: '',
          }

        case REGISTER_USER_BEGIN: 
          return {
            ...state,
            isLoading: true
          }
    
        case REGISTER_USER_SUCCESS: 
        const { user, location } = action.payload
          return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertText: 'Account created, Redirecting!!!',
            alertType: 'success',
            user,
            userLocation: location
          }
    
        case REGISTER_USER_ERROR: 
        
          return {
            ...state,
            isLoading: false,
          }
    
        case LOGIN_USER_BEGIN: 
          return {
            ...state,
            isLoading: true
          }
    
        case LOGIN_USER_SUCCESS: 
          const { user: currentUser } = action.payload
          let alertTxt
          if(currentUser.email === "test-user@gmail.com"){
            alertTxt = "Logged in as test-user, Redirecting!!!"
          }
          else {
            alertTxt = 'Login Successfully, Redirecting!'
          }
          return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertText: alertTxt,
            alertType: 'success',
            user: currentUser,
            userLocation: action.payload.location
          }
    
        case LOGIN_USER_ERROR: 
        
          return {
            ...state,
            isLoading: false,
          }
    
        case LOGOUT_USER: 
        return {
          ...state,
          user: null,
          userLocation: '',
          jobLocation: '',
          isLoading: false,
          userLoading: false
        }

        case UPDATE_USER_BEGIN: 
        return {
          ...state,
          isLoading: true
        }

        case UPDATE_USER_SUCCESS: 
       
        return {
          ...state,
          isLoading: false,
          user: action.payload.user,
          userLocation: action.payload.location
        }

        case UPDATE_USER_ERROR: 
        return {
          ...state,
          isLoading: false,
        }

        case HANDLE_FORM_CHANGE:
          const {name, value } = action.payload
          return {
            ...state, page:1, [name]: value
          }
          
        case CLEAR_FORM_INPUTS:
          const initialState = {
            company: '',
            position: '',
            jobLocation: state.userLocation,
            jobType: 'full-time',
            status: 'pending',
            isEditing: false,
            editJobId: '',
            search: '',
            searchStatus: 'all',
            searchType: 'all',
            sort: 'latest'
        }
          return {
            ...state, ...initialState 
          }
        
        case CREATE_JOB_BEGIN:

        return {
          ...state,
          isLoading: true
        }

        case CREATE_JOB_SUCCESS:
          const initials = {
            company: '',
            position: '',
            jobLocation: state.userLocation,
            jobType: 'full-time',
            status: 'pending'
        }
        return {
          ...state,
          ...initials,
          isLoading: false,
        }

        case CREATE_JOB_ERROR:
          const initial = {
            company: '',
            position: '',
            jobLocation: state.userLocation,
            jobType: 'full-time',
            status: 'pending'
        }
        return {
          ...state,
          ...initial,
          isLoading: false,
        }

        case GETALLJOBS_BEGIN: 
        return {
          ...state,
          isLoading: true
        }

        case GETALLJOBS_SUCCESS: 
        const {jobs, totalJobs, numOfPages } = action.payload
        return {
          ...state,
          isLoading: false,
          jobs,
          totalJobs,
          numOfPages
        }
        case GETALLJOBS_ERROR: 
        return {
          ...state,
          isLoading: false,
        }

        case SET_EDIT_JOB:
         const editedJob = state.jobs.find((job)=> job._id === action.payload.id)
         const {
          company, 
          position,
          jobLocation,
          jobType,
          status
        }= editedJob;

        return {
          ...state,
          isEditing: true,
          editJobId: action.payload.id,
          company, 
          position,
          jobLocation,
          jobType,
          status
        }

        case UPDATE_JOB_BEGIN: 
        return {
          ...state,
          isEditing: true,
          editing: true,
        }
        
        case UPDATE_JOB_SUCCESS: 
        return {
          ...state,
          isEditing: true,
          editing: false
        }
        case UPDATE_JOB_ERROR: 
        return {
          ...state,
          isEditing: true,
          editing: false,
        }

        case SET_DELETE_JOB: 
        return {
          ...state,
          deleting: false,
          isDeleting: true,
          deleteJobName: action.payload.name,
          deleteJobId: action.payload.id,
        }

        case CANCEL_DELETE_JOB: 
        return {
          ...state,
          isDeleting: false,
          deleteJobName: '',
          deleteJobId: '',
        }

        case DELETE_JOB_BEGIN: 
        return {
          ...state,
          deleting: true,
        }
        case DELETE_JOB_SUCCESS:   
        return {
          ...state,
          deleting: false,
          
        }
        case DELETE_JOB_ERROR: 
        return {
          ...state,
          deleting: false,
        }

        case SHOW_STATS_BEGIN: 
        return {
          ...state,
          isLoading: true,
        }
        case SHOW_STATS_SUCCESS: 
        const { stats, monthlyApplications } = action.payload
        return {
          ...state,
          stats,
          monthlyApplications,
          isLoading: false,
        }

        case CHANGE_PAGE: 
        return {...state, page: action.payload}

        case GET_CURRENT_USER_BEGIN: 
        return {
          ...state,
          userLoading: true,
          showAlert: false
        }

        case GET_CURRENT_USER_SUCCESS: 
        return {
          ...state,
          user: action.payload.user,
          jobLocation: action.payload.location,
          userLocation: action.payload.location,
          userLoading: false,
          showAlert: false
        }

        default:
            break;
    }
    throw new Error(`no such action :${action.type}`)
}
