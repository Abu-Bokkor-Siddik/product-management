import express from 'express'
import { productController } from './product.controller'
const router = express.Router()
// search products 
router.get('/products',productController.searchProductController)
// post router 
router.post('/products',productController.createProduct)

// get all 
router.get('/products',productController.allProductController)
// single product
router.get('/products/:productId',productController.singleProductController)
// put or update products 
router.put('/products/:productId',productController.updateProductController)
// delete products 
router.delete('/products/:productId',productController.deleteProductController)
// 
export const productRoute = router;