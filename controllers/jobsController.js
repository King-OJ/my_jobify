import { StatusCodes } from 'http-status-codes';
import Job from '../models/Job.js'
import { BadRequestError } from '../errors/index.js';

export function getAllJobs(req, res){
    res.send('getAllJobs route')
}

export async function createJob(req, res){
    const {position, company} = req.body
    if(!position || !company){
        throw new BadRequestError('Please provide all values')
    }
    //create a property on the req body to hold user id
    req.body.createdBy = req.user.userId

    
    res.send('createJob route')
}

export function deleteJob(req, res){
    res.send('deleteJob route')
}

export function updateJob(req, res){
    res.send('updateJob route')
}

export function showStats(req, res){
    res.send('showStats route')
}