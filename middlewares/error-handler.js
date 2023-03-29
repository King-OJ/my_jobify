import { StatusCodes } from "http-status-codes";

export default function errorHandlerMiddleware(err, req, res, next){
    console.log(err);
    
    const defaultError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong! Try again later.'
    }

    

    if(err.name && err.name === 'ValidationError'){
        const errText = Object.keys(err.errors).map((item) => {
            let text = `${item} must be atleast ${err.errors[item].properties.minlength} characters`
            if(item === 'email'){
                text = err.errors[item].properties.message
            }
         return [text].join(' , ')
        })
        
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.msg = errText

    }

    if(err.code && err.code === 11000){
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.msg = `${Object.keys(err.keyValue)} field must be unique`
    }

    res.status(defaultError.statusCode).json({msg: defaultError.msg})
}