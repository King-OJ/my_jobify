import express from 'express'
import authenticateUser from '../middlewares/auth.js'
import testUser from '../middlewares/testUser.js'
import { login, register, updateUser, getCurrentUser } from '../controllers/authController.js'

const router = express.Router()

import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

router.route('/register').post(apiLimiter, register)
router.route('/login').post(apiLimiter, login)
router.route('/updateUser').patch(authenticateUser, testUser, updateUser)
router.route('/getCurrentUser').get(authenticateUser, getCurrentUser)

export default router