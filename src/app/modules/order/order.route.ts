import express from 'express'
import { OrderController } from './order.controller'

const route = express.Router()
// create order
route.post('/orders', OrderController.orderCreate)
// get all order and find by email
route.get('/orders', OrderController.allOrderController)

export const orderRoute = route
