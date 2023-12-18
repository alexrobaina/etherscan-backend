import express from 'express'
import { login, checkIsLoading } from '../useCases/authCase/login'
import { tokenDecoded } from '../utils/tokenDecoded'

const router = express.Router()

router.post('/login/', login)
router.get('/login/', [tokenDecoded], checkIsLoading)

export default router
