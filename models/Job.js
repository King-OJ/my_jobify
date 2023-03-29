import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide a company'],
        maxlength: 90,
    },
    position: {
        type: String,
        required: [true, 'Please provide a position'],
        maxlength: 50,
    },
    status: {
        type: String,
        enum: ['approved', 'declined', 'pending'],
        default: 'pending',
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'remote', 'internship'],
        default: 'full-time',
    },
    jobLocation: {
        type: String,
        default: 'my city',
        required: [true, 'Please provide a job location'],
    },
    createdBy: {
       type: mongoose.Types.ObjectId,
       ref: 'User',
       required: [true, 'Please provide user' ]
    },

    },

    {timestamps: true}
)

export default mongoose.model('Job', JobSchema)