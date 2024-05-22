import { Request, Response } from 'express'
import { orderServics } from './order.servics'
import joi from 'joi'
import { productService } from '../product/product.servics'
const orderCreate = async (req: Request, res: Response) => {
  try {
    // joi schema create here

    const orderSchema = joi.object({
      email: joi.string().email().required(),
      productId: joi.string().required(),
      price: joi.number().required(),
      quantity: joi.number().required(),
    })
    const order = req.body

    // first i find data products document
    const findProductData = await productService.singleProductToDB(
      order?.productId,
    )
    const numberReduce: number =
      (findProductData?.inventory?.quantity ?? 0) - order?.quantity
    // console.log(numberReduce)
    if (numberReduce < 0) {
      res.status(500).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      })
    }
    if (numberReduce == 0) {
      await productService.updateIsZero(order?.productId, numberReduce)
      res.status(200).json({
        success: true,
        message: 'stock update successfully!',
      })
    }
    // update here
    if (numberReduce > 0) {
      const reduce: number =
        (findProductData?.inventory?.quantity ?? 0) - order?.quantity
      await productService.updateProductReduceToDB(order?.productId, reduce)

      const { error } = orderSchema.validate(order)
      const results = await orderServics.createOrderToDB(order)
      if (error) {
        res.status(500).json({
          success: false,
          message: 'some thing is wrong',
          error: error.details,
        })
      }

      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: results,
      })
    } //if ar
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
      const email: string = req.query?.email as string
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
          message: 'Orders fetched successfully for user email!',
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
    res.status(500).json({
      success: false,
      message: 'something is wrong',
    })
  }
}

export const OrderController = {
  orderCreate,
  allOrderController,
 
}
