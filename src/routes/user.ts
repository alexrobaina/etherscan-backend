import express from 'express'
import { create, getUser } from '../useCases/userCases/userController'
import { verifyToken } from '../middlewares/auth'

const router = express.Router()

router.post('/user', create) // CREATE USER

router.get('/user', [verifyToken], getUser) // GET USER

export default router
