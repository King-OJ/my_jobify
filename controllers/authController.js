import { StatusCodes } from "http-status-codes";
import {BadRequestError, UnauthenticatedError} from "../errors/index.js";
import User from "../models/User.js";

export async function register(req, res){
    
       
       const {name, email, password } = req.body
       if(!name || !email || !password){
        throw new BadRequestError('Please fill out all fields')
       }

       const userAlreadyExists = await User.findOne({email})
       if(userAlreadyExists){
        throw new BadRequestError('Email already in use')
       }
       
       const user = await User.create({name, email, password })
       const token = user.createJWT()

       res.status(StatusCodes.CREATED).json({user: {
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        location: user.location,
       }, 
       location: user.location,
       token})
   
}

export async function login(req, res){
    const { email, password} = req.body
   
    if( !email || !password){
        throw new BadRequestError('Please fill out all fields')
    }

    const user = await User.findOne({email}).select('+password');
   
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials');
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Incorrect login details!')
    }

    const token = user.createJWT()
    
    res.status(StatusCodes.OK).json({user: {
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        location: user.location,
       },
       location: user.location,
       token})

}

export async function updateUser(req, res){
   
    const { email, name, lastName, location } = req.body;
    const { userId } = req.user

    if(!email || !name || !lastName || !location){
        throw new BadRequestError('Please provide all values!')
    }
    
    const user = await User.findOne({_id: userId})
    user.name = name
    user.email = email
    user.lastName = lastName
    user.location = location

    await user.save()

    //regenerate token

    const token = user.createJWT()

    res.status(StatusCodes.OK).json({user: {
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        location: user.location,
       }, 
       location: user.location,
       token})
}

