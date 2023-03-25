import { useAppContext } from "../context/appContext"
import { Navigate } from 'react-router-dom'


export default function PrivateRoute({children}) {

const { user } = useAppContext()

if(!user){
    return <Navigate to='/landing' />
}
    
  return children;
}
