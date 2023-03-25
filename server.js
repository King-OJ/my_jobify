import express from 'express'
import dotenv from 'dotenv'
import notFoundMiddleware from './middlewares/not-found.js';
import errorHandlerMiddleware from './middlewares/error-handler.js';
import connectDB from './db/connect.js';
import 'express-async-errors';
import cors from 'cors';

dotenv.config()



const app = express()
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())

import morgan from 'morgan';
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.get('/', (req, res)=>{
    res.send('welcome clem')
    // throw new Error('wrong route')
})

import authRouter from './routes/authRoutes.js'
app.use('/api/v1/auth', authRouter )

import authenticateUser from './middlewares/auth.js'
import jobsRouter from './routes/jobsRoutes.js'
app.use('/api/v1/jobs', authenticateUser, jobsRouter )

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


async function start(){
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, ()=>{
            console.log(`server is up and running on ${port}`);
        })
        
    } catch (error) {
       console.log(error); 
    }
}

start();


