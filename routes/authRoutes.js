import express from 'express'
import authenticateUser from '../middlewares/auth.js'
import { login, register, updateUser } from '../controllers/authController.js'

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/updateUser').patch(authenticateUser, updateUser)

export default router