
import { Order } from './order.interface';
import { orderModel } from './order.model';
const createOrderToDB =async (order:Order)=>{
    const result = await orderModel.create(order)
    return result;
    }

    export const orderServics = {
        createOrderToDB,
    }