import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { index, update, destroy, show } from './controller'
import { userModel } from '../../models/user'

const router = new Router()
/**
 * @api {get} /ranks Retrieve ranks
 * @apiName RetrieveOrders
 * @apiGroup Order
 * @apiUse listParams
 * @apiSuccess {Object[]} ranks List of ranks.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', query({ username: { type: String }, email: { type: String } }), index)

/**
 * @api {put} /ranks/:id Update group
 * @apiName UpdateOrder
 * @apiGroup Order
 * @apiParam name Order's name.
 * @apiParam desc Order's desc.
 * @apiParam picture Order's picture.
 * @apiParam group Order's group.
 * @apiSuccess {Object} group Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 */
router.put('/:id', body(userModel), update)

/**
 * @api {delete} /ranks/:id Delete group
 * @apiName DeleteOrder
 * @apiGroup Order
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Order not found.
 */
router.delete('/:id', destroy)

router.get('/:id', show)

export default router
