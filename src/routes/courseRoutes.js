import { Router } from 'express'
import { requireAuth } from '../middleware/authMiddleware.js'
import * as courseController from '../controllers/courseController.js'

const router = Router()

router.get('/', requireAuth, courseController.course_index)
router.get('/create', requireAuth, courseController.course_create_get)
router.post('/create', requireAuth, courseController.course_create_post)
router.delete('/delete/:id', requireAuth, courseController.course_delete)

export { router }
