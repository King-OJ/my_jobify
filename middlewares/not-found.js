import { StatusCodes } from 'http-status-codes'

export default function notFoundMiddleware(req, res){

    return res.status(StatusCodes.NOT_FOUND).send('Route does not exist')
}