import CustomError from "./custom-api.js";
import { StatusCodes } from "http-status-codes";

export default class NotFoundError extends CustomError{
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}
