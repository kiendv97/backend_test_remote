import { success, notFound, failed } from '../../../services/response'
import UserModel from '../../models/user'

// can view all other users
export const index = async (req, res, next) => {
  const {
    querymen: { query, select, cursor }
  } = req
  try {
    const users = await UserModel.find(query, select, cursor)
    const mappingUsers = users.map((user) => user.view())
    success(res, 200)({ data: mappingUsers })
  } catch (error) {
    failed(res)(error)
  }
}

export const show = async (req, res, next) => {
  const { params } = req

  try {
    const user = await UserModel.findOne({ _id: params.id })
    if (!user) {
      return notFound(res)
    }
    success(res, 200)({
      data: user.view()
    })
  } catch (error) {
    failed(res)(error)
  }
}

export const update = async (req, res, next) => {
  const {
    viewer,
    bodymen: { body },
    params
  } = req
  try {
    if (viewer.id !== params.id) {
      return res.status(403).send({ error: 'You are not authorized to perform this action' })
    }

    const user = await UserModel.findOne({ _id: params.id })
    if (!user) {
      return notFound(res)
    }
    Object.assign(user, body).save()
    success(res, 200)({ data: body })
  } catch (error) {
    failed(res)(error)
  }
}

export const destroy = async (req, res, next) => {
  const viewer = req.viewer
  try {
    if (viewer.id !== req.params.id) {
      return res.status(403).send({ error: 'You are not authorized to perform this action' })
    }
    const user = await UserModel.findOne({ _id: req.params.id })
    if (!user) {
      return notFound(res)
    }

    user.remove()
    success(res, 204)({ data: null })
  } catch (error) {
    failed(res)(error)
  }
}
