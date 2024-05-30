import { Router } from 'express'
import { middleware as body } from 'bodymen'
import { register, login } from './controller'
import { userModel } from '../models/user'

const router = new Router()

router.post('/register', body(userModel), register)
router.post('/login', body({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}), login)

export default router
