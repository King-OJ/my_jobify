import { CLEAR_ALERT, LOGIN_USER_BEGIN, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, LOGOUT_USER, REGISTER_USER_BEGIN, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS, SHOW_ALERT, UPDATE_USER_BEGIN, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS } from "./actions";


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
        const { user, token } = action.payload
          return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertText: 'Login Successfully, Redirecting!',
            alertType: 'success',
            user,
            token,
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
     
          return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertText: 'Login Successfully, Redirecting!',
            alertType: 'success',
            user: action.payload.user,
            token: action.payload.token,
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
          token: null
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
          token: action.payload.token,
        }

        case UPDATE_USER_ERROR: 
       
        return {
          ...state,
          isLoading: false,
        }

        default:
            break;
    }
    throw new Error(`no such action :${action.type}`)
}
