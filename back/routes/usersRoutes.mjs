import express from 'express'

import { getAllUsers } from '../controllers/usersController.mjs'; 

const router = express.Router()

router.route('/').get(getAllUsers)

export default router;