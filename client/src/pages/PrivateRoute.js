import { useAppContext } from "../context/appContext"
import { Navigate } from 'react-router-dom'
import Loader from '../components/Loader'

export default function PrivateRoute({children}) {

const { user, userLoading } = useAppContext()

if(userLoading) return <Loader />

if(!user){
    return <Navigate to='/landing' />
}
    
  return children;
}
