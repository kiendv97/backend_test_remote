import { Router } from 'express'
import virtualItems from './virtual-items'
import users from './users'

const router = new Router()

router.use('/users', users)
router.use('/items', virtualItems)

export default router
