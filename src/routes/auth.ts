import express from 'express'
import { login } from '../useCases/authCase/login'
import { verifyToken } from '../middlewares/auth'

const router = express.Router()

router.post('/login/', login)

export default router
