import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/index.js'

export default async function auth(req, res, next){
    
    const authHeader = req.headers.authorization;

    if(!authHeader){
        throw new UnauthenticatedError('Authentication Invalid')
    }

    const token = authHeader.split(' ')[1]

    try {
       const payload = jwt.verify(token, process.env.JWT_SECRET)
       req.user = {userId : payload.userID }
    } 
    catch (error) {
        throw new UnauthenticatedError('Authentication invalid');
    }

    next();
} 