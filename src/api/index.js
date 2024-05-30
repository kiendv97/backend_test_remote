import { Router } from 'express'
// import user from './user'
import apiPublic from './public'
import apiRegister from './credential'

import { token } from '../services/auth'

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
router.use('/be-test', token({ required: true }), apiPublic)
router.use('/auth', apiRegister)

export default router
