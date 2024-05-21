import express from 'express';
import { OrderController } from './order.controller';


const route = express.Router();
// create order 
route.post('/orders',OrderController.orderCreate)

route.get('/orders',OrderController.allOrderController)

export const orderRoute = route;