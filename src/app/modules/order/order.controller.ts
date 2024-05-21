import { Request, Response } from 'express'
import { orderServics } from './order.servics'

const orderCreate = async (req: Request, res: Response) => {
  try {
    const order = req.body
    const result = await orderServics.createOrderToDB(order)
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

export const OrderController ={
    orderCreate,
}