import UserModal from '../models/user'
import { sign } from '../../services/jwt'
import { notFound, success } from '../../services/response'

export const register = async (req, res, next) => {
  const {
    // viewer,
    bodymen: { body }
  } = req
  try {
    const createdUser = await UserModal.create(body)

    const token = await sign({
      id: createdUser._id,
      username: createdUser.username
    })

    const response = {
      user: createdUser.view(),
      token
    }
    success(res, 201)(response)
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  const {
    // viewer,
    bodymen: { body }
  } = req
  try {
    const { email, password } = body
    const user = await UserModal.findOne({ email })

    if (!user || !user.comparePassword(password)) {
      return res.status(400).send({ error: 'Invalid login credentials' })
    }

    const token = await sign({
      id: user._id,
      username: user.username
    }) // Use a secure key in production
    success(res, 200)({ user: user.view(), token })
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  const {
    // viewer,
    bodymen: { body },
    params
  } = req
  try {
    const user = await UserModal.findOne({ _id: params.id })
    if (!user) {
      return notFound(res)
    }
    Object.assign(user, body).save()
    success(res, 200)(body)
  } catch (error) {
    next(error)
  }
}
