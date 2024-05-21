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
// all order controller
const allOrderController = async (req: Request, res: Response) => {
  try {
    if (req.query?.email) {
      const email:string = req.query?.email as string;
    const result = await orderServics.emailOrderToDB(email)
    res.status(200).json({
      success: true,
      message: 'email fetched successfully!',
      data: result,
    })
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
// email get all order 
// const emailOrderController = async (req: Request, res: Response) => {
//   try {
    // const email:string = req.query?.email as string;
    // const result = await orderServics.emailOrderToDB(email)
    // res.status(200).json({
    //   success: true,
    //   message: 'email fetched successfully!',
    //   data: result,
    // })
//   } catch (error) {
//     console.log(error)
//   }
// }
export const OrderController = {
  orderCreate,
  allOrderController,
  // emailOrderController,
}
