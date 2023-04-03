import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import moment from 'moment';
import Job from '../models/Job.js'
import { BadRequestError, NotFoundError } from '../errors/index.js';
import checkPermission from '../utils/checkPermissions.js';


export async function createJob(req, res){
    const {position, company} = req.body
    if(!position || !company){
        throw new BadRequestError('Please provide all values')
    }
    //create a property on the req body to hold user id
    req.body.createdBy = req.user.userId
 
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

export async function getAllJobs(req, res){
    const { status } = req.query
    const allJobs = await Job.find({ createdBy: req.user.userId})
    res.status(StatusCodes.OK).json({jobs: allJobs, totalJobs: allJobs.length, numOfPages: 1})
}

export async function deleteJob(req, res){
    const { id: jobId } = req.params
    
    const job = await Job.findOne({_id: jobId})

    if(!job){
        throw new NotFoundError(`No Job with ID ${jobId}`)
    }
    
    //check whether its only the job creator that is trying to access it, not anyone else
    checkPermission(req.user.userId, job.createdBy)

    await Job.findOneAndDelete({_id: jobId})
    res.status(StatusCodes.OK).json({msg: 'Job Successfully Deleted!'})
}

export async function updateJob(req, res){
    
    const { company, position } = req.body
    const { id: jobId } = req.params
    if(!company || !position){
        throw new BadRequestError('Please fill out all fields!')
    }

    const job = await Job.findOne({_id: jobId})

    if(!job){
        throw new NotFoundError(`No Job with ID ${jobId}`)
    }
    //check whether its only the job creator that is trying to access it, not anyone else
    checkPermission(req.user.userId, job.createdBy)

    const updatedJob = await Job.findOneAndUpdate({ _id: jobId}, req.body, {new: true, runValidators: true} )

    res.status(StatusCodes.OK).json({updatedJob})
  
}

export async function showStats(req, res){
    
    let stats = await Job.aggregate([
        {
            $match : { createdBy: new mongoose.Types.ObjectId(req.user.userId)} 
        },
        {
            $group: {_id: "$status", count: { $sum: 1}}
        }
    ])

    stats = stats.reduce((acc, curr)=>{
        const {_id: title, count} = curr;
        acc[title] = count
        return acc;
    }, {})

    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.approved || 0,
        declined: stats.declined || 0,
      };

      let monthlyApplications = await Job.aggregate([
        {
            $match : { createdBy: new mongoose.Types.ObjectId(req.user.userId)}   
        },
        //group the jobs by years and months, then count how many fall in the category
        {
            $group : {
                _id: { 
                    year: {
                        $year: "$createdAt"}, 
                    month: {
                        $month: "$createdAt"}},
                count: { $sum: 1}
            }
        },
        // sort the grouped results in descending order
        {
          $sort: { '_id.year': -1,'_id.month': -1 }  
        },
        { $limit: 6 },
      ]);

      //refactor monthly applications data

      monthlyApplications = monthlyApplications.map((item)=> {
        const { _id:{ year, month}, count } = item

        //moment counts month from 0 -11, hence the -1 subtracted from month
        const date = moment().month(month - 1).year(year).format('MMM Y')
        return { date, count}
      }).reverse()
    
    res.status(StatusCodes.OK).json({defaultStats, monthlyApplications})
}