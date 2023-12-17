import express from 'express'
import {
  create,
  update,
  getAddress,
  getAddresses,
  deleteAddress,
} from '../useCases/addressCases/addressController'
import { verifyToken } from '../middlewares/auth'

const router = express.Router()

router.post('/address', [verifyToken], create)

router.get('/address/:id', getAddress)

router.get('/address', [verifyToken], getAddresses)
router.put('/address', [verifyToken], update)

router.delete('/address/:id', [verifyToken], deleteAddress)

export default router
