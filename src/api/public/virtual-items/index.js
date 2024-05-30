import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, update, destroy } from './controller'
import { itemModel } from '../../models/virtual-item'

const router = new Router()
/**
 * @api {post} /item Create group
 * @apiName CreateOrder
 * @apiGroup Order
 * @apiParam name Order's name.
 * @apiParam desc Order's desc.
 * @apiParam picture Order's picture.
 * @apiParam group Order's group.
 * @apiSuccess {Object} group Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 */
router.post('/', body(itemModel), create)
/**
 * @api {get} /item Retrieve item
 * @apiName RetrieveOrders
 * @apiGroup Order
 * @apiUse listParams
 * @apiSuccess {Object[]} item List of item.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', query({ itemName: { type: String } }), index)

/**
 * @api {put} /item/:id Update group
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
router.put('/:id', body(itemModel), update)

/**
 * @api {delete} /item/:id Delete group
 * @apiName DeleteOrder
 * @apiGroup Order
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Order not found.
 */
router.delete('/:id', destroy)

export default router
