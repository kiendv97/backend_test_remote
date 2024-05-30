import { success, notFound, failed } from '../../../services/response'
import VirtualItemModal from '../../models/virtual-item'
import UserModal from '../../models/user'

export const create = async (req, res, next) => {
  const {
    // viewer,
    bodymen: { body }
  } = req
  try {
    const user = await UserModal.findById(body.owner)
    if (!user) {
      throw new Error({ message: 'User not found' })
    }
    const createdItem = await VirtualItemModal.create(body)
    success(res, 201)({
      data: createdItem.view()
    })
  } catch (error) {
    failed(res)(error)
  }
}

export const index = async (req, res, next) => {
  const {
    querymen: { query, select, cursor }
  } = req
  try {
    const items = await VirtualItemModal.find(query, select, cursor).populate('owner')
    const mappingItems = items.map((user) => user.view())
    success(res, 200)({ data: mappingItems })
  } catch (error) {
    failed(res)(error)
  }
}

export const show = async (req, res, next) => {
  const { params } = req
  try {
    const item = await VirtualItemModal.findOne({ _id: params.id }).populate('owner')
    if (!item) {
      return notFound(res)
    }
    success(res, 200)({ data: item.view() })
  } catch (error) {
    failed(res)(error)
  }
}

export const update = async (req, res, next) => {
  const {
    // viewer,
    bodymen: { body },
    params
  } = req
  try {
    if (body.owner) {
      const user = await UserModal.findById(body.owner)
      if (!user) {
        throw new Error('User not found')
      }
    }

    const item = await VirtualItemModal.findOne({ _id: params.id })
    if (!item) {
      return notFound(res)
    }
    Object.assign(item, body).save()
    success(res, 200)({ data: body })
  } catch (error) {
    failed(res)(error)
  }
}

export const destroy = async (req, res, next) => {
  try {
    const item = await VirtualItemModal.findOne({ _id: req.params.id })
    if (!item) {
      return notFound(res)
    }
    item.remove()
    success(res, 204)({ data: null })
  } catch (error) {
    failed(res)(error)
  }
}
