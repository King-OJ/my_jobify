import express from 'express'
import testUser from '../middlewares/testUser.js'
import { createJob, deleteJob, getAllJobs, showStats, updateJob } from '../controllers/jobsController.js'

const router = express.Router()

router.route('/').post(testUser, createJob).get(getAllJobs)
router.route('/stats').get(showStats)
router.route('/:id').delete(testUser, deleteJob).patch(testUser, updateJob)

export default router;