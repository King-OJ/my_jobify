import express from 'express'
import dotenv from 'dotenv'
import notFoundMiddleware from './middlewares/not-found.js';
import errorHandlerMiddleware from './middlewares/error-handler.js';
import connectDB from './db/connect.js';
import 'express-async-errors';
import cors from 'cors';

dotenv.config()

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';


import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

const app = express()
const port = process.env.PORT || 5000;

//serving the client build app from the server port
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './client/build')))

app.use(express.json())
//security packages
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

//to be able to access 5000 from frontend in development
// app.use(cors())

import morgan from 'morgan';
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// app.get('/', (req, res)=>{
//     res.send('welcome clem')
//     // throw new Error('wrong route')
// })

import authRouter from './routes/authRoutes.js'
app.use('/api/v1/auth', authRouter )

import authenticateUser from './middlewares/auth.js'
import jobsRouter from './routes/jobsRoutes.js'
app.use('/api/v1/jobs', authenticateUser, jobsRouter )

//now we can access frontend client side from port 5000
app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
} )

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


