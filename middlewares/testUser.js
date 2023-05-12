import { BadRequestError } from "../errors/index.js";

export default function testUser(req, res, next){
    if(req.user.testUser){
        throw new BadRequestError('Test User cannot make changes!')
    }
    next()
}