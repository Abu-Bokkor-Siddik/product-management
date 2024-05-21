import { orderRoute } from './app/modules/order/order.route';
// import { productRoute } from './../dist/app/modules/product/prouct.route';

import express, { Application, Request, Response } from 'express'
import cors from 'cors';
import { productRoute } from './app/modules/product/product.route';
const app: Application = express()
// all route here 
app.use(express.json());
app.use(cors());
app.use('/api',productRoute)
//  all order here 
app.use('/api',orderRoute)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
  
})

export default app
