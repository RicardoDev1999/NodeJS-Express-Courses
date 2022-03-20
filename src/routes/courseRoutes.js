import express from 'express'
import * as courseController from '../controllers/courseController.js'

const router = express.Router()

router.get('/', courseController.course_index)
router.get('/create', courseController.course_create_get)
router.post('/create', courseController.course_create_post)
router.delete('/delete/:id', courseController.course_delete)

export { router }
