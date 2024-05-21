import { Request, Response } from 'express'
import { productService } from './product.servics'
import joi from 'joi';

const createProduct = async (req: Request, res: Response) => {
  try {

    // create a schema for joi 
    const joiSchema = joi.object({
      name:joi.string().required(),
      description:joi.string().required(),
      price:joi.number().required(),
      category:joi.string().required(),
      tags:joi.array().items(joi.string()).required(),
      variants:joi.array().items(
        joi.object({
          type:joi.string(),
          value:joi.string()
        })
      ).required(),
      inventory:joi.object({
        quantity:joi.number(),
        inStock:joi.boolean()
      }).required() 
    })

   
    const product = req.body
    const {error}= joiSchema.validate(product)
    // console.log(error)
    // console.log(value)
    const result = await productService.createProductToDB(product)
      if (error) {
        res.status(500).json({
          success: false,
          message: 'some thing is wrong',
          error:error.details,
        })
      }
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'some thing is wrong on data',
    })
  }
}
// all products controller 
const allProductController = async(req:Request,res:Response)=>{
    try {
        const result = await productService.allProductToDB();
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: result,
          })
    } catch (error) {
        console.log(error)
    }
}
// single product 
const singleProductController = async(req:Request,res:Response)=>{
    try {
         const {productId}= req.params;
        //  console.log(productId)
        const result = await productService.singleProductToDB(productId);
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: result,
          })
    } catch (error) {
        console.log(error)
    }
}
// update product
const updateProductController = async(req:Request,res:Response)=>{
  try {
       const {productId}= req.params;
       const updateContent = req.body;
      //  console.log(productId)
      //  console.log(updateContent)
      const result = await productService.updateProductToDB(productId,updateContent);
      // console.log(result)
      res.status(200).json({
          success: true,
          message: 'Products update successfully!',
          data: result,
        })
  } catch (error) {
      console.log(error)
  }
}
// delete products 
const deleteProductController = async(req:Request,res:Response)=>{
  try {
       const {productId}= req.params;
       
      //  console.log(productId)
      //  console.log(updateContent)
      const result = await productService.deleteProductToDB(productId);
      // console.log(result)
      res.status(200).json({
          success: true,
          message: 'product delete successfully!',
          data: null,
        })
  } catch (error) {
      console.log(error)
  }
}
// search products 
const searchProductController = async(req:Request,res:Response)=>{
  try {
       const searchTerm:string= req.query.searchTerm as string;
       const searchRegex = new RegExp(searchTerm,"i")
      //  console.log(searchTerm)
      //  console.log(typeof(searchRegex))
      const result = await productService.searchProductToDB(searchTerm,searchRegex);
      // console.log(result)
      res.status(200).json({
          success: true,
          message: `Products matching search term ${searchTerm}fetched successfully!`,
          data: result,
        })
  } catch (error) {
      console.log(error)
  }
}
export const productController = {
  createProduct,
  allProductController,
  singleProductController,
  updateProductController,
  deleteProductController,
  searchProductController,
}
