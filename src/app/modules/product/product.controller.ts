import { Request, Response } from 'express'
import { productService } from './product.servics'

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body
    const result = await productService.createProductToDB(product)

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    })
  } catch (error) {
    console.log(error)
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
         console.log(productId)
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
       console.log(searchTerm)
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
