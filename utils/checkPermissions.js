import { UnauthenticatedError } from "../errors/index.js";

export default function checkPermission(userId, jobUserId){
    
    if(userId !== jobUserId.toString()){
        throw new UnauthenticatedError('Not authorized to access this route!')
    }
    return 
}