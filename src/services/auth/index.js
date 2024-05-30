import UserModal from '../../api/models/user'
import { verify } from '../jwt'

export const token = ({ required, roles = [] } = {}) => (req, res, next) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    if (!req.headers.authorization) { return reject(new Error(JSON.stringify({ status: 401, message: 'Unauthorized' }))) }
    try {
      const token = req.header('Authorization').replace('Bearer ', '')
      const decoded = await verify(token) // Use a secure key in production
      const user = await UserModal.findById(decoded.id.id)
      if (!user) {
        throw new Error()
      }
      req.viewer = user.view()
      resolve(next())
    } catch (error) {
      return reject(new Error(JSON.stringify({
        status: error?.response?.data?.status || 401,
        statusText: error?.response?.data?.statusText || 'ERROR',
        message: error?.response?.data?.message || 'Unauthorized'
      })))
    }
  })
    .catch(next)
}
