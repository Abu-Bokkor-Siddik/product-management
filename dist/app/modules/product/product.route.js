"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
// search products 
router.get('/products', product_controller_1.productController.searchProductController);
// post router 
router.post('/products', product_controller_1.productController.createProduct);
// get all 
router.get('/products', product_controller_1.productController.allProductController);
// single product
router.get('/products/:productId', product_controller_1.productController.singleProductController);
// put or update products 
router.put('/products/:productId', product_controller_1.productController.updateProductController);
// delete products 
router.delete('/products/:productId', product_controller_1.productController.deleteProductController);
exports.productRoute = router;
