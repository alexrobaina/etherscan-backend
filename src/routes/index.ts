import routerx from 'express-promise-router'
import userRoutes from './user'
import addressRoutes from './address'
import authRoutes from './auth'
import etherRoutes from './ether'

const router = routerx()

router.use('/api/v1', userRoutes, addressRoutes, etherRoutes)
router.use('/api/auth', authRoutes)

export default router
