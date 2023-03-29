import { readFile } from 'fs/promises';

import dotenv from 'dotenv';
dotenv.config();

import connectDB from './db/connect.js';
import Job from './models/Job.js';

async function populateDB(){
    try {
        //connect to the DB
        await connectDB(process.env.MONGO_URL)

        //clearout all the previous jobs from the job document
        await Job.deleteMany()

        const jsonMockJobs = JSON.parse(await readFile(new URL('./jobify-mockJobs.json', import.meta.url)) )
        await Job.create(jsonMockJobs)
        console.log('success!!!');
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

populateDB()