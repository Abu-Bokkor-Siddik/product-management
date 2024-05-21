import { Request, Response } from 'express'
import { orderServics } from './order.servics'
import joi from 'joi';
const orderCreate = async (req: Request, res: Response) => {
  try {
    const orderSchema = joi.object({
      email:joi.string().email().required(),
      productId:joi.string().required(),
      price:joi.number().required(),
      quantity:joi.number().required()
    })
    const order = req.body
    const {error}= orderSchema.validate(order)
    const result = await orderServics.createOrderToDB(order)
    if (error) {
      res.status(500).json({
        success: false,
        message: 'some thing is wrong',
        error:error.details,
      })
    }
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'some thing is wrong',
      
    })
  }
}
// all order controller
const allOrderController = async (req: Request, res: Response) => {
  try {
    if (req.query?.email) {
      const email:string = req.query?.email as string;
    const result = await orderServics.emailOrderToDB(email)
    // console.log(result)
    if (result.length == 0) {
      res.status(400).json({
        success: false,
        message: 'Order not found',
        
      })
      
    } else {
      res.status(200).json({
        success: true,
        message: 'email fetched successfully!',
        data: result,
      })
    }
    }
    if (!req.query?.email) {
      const result = await orderServics.allOrderToDB()
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    })
    }
  } catch (error) {
    console.log(error)
  }
}

export const OrderController = {
  orderCreate,
  allOrderController,
  // emailOrderController,
}
