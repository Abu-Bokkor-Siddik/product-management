import { Order } from './order.interface'
import { orderModel } from './order.model'
const createOrderToDB = async (order: Order) => {
  const result = await orderModel.create(order)
  return result
}
// all order
const allOrderToDB = async () => {
  const result = await orderModel.find()
  return result
}
// find email order
const emailOrderToDB = async (email: string) => {
  const result = await orderModel.find({ email })
  return result
}
export const orderServics = {
  createOrderToDB,
  allOrderToDB,
  emailOrderToDB,
}
