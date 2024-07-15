import express from 'express'

const router = express.Router()

router.route('/comment')
router.route('/like')
router.route('/follow')

export default router