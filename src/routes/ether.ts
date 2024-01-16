import {
  create,
  getAllExchangeRates,
  getEtherExchangeRate,
} from '../useCases/etherCases/etherController'
import express from 'express'

import { verifyToken } from '../middlewares/auth'

const router = express.Router()

router.get('/etherExchangeRate', [verifyToken], getEtherExchangeRate)
router.post('/etherExchangeRate', [verifyToken], create)
router.get('/etherExchangeRate/:addressId', [verifyToken], getAllExchangeRates)

export default router
