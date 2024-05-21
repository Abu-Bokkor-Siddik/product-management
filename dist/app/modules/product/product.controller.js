"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_servics_1 = require("./product.servics");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const result = yield product_servics_1.productService.createProductToDB(product);
        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
// all products controller 
const allProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_servics_1.productService.allProductToDB();
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
// single product 
const singleProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        //  console.log(productId)
        const result = yield product_servics_1.productService.singleProductToDB(productId);
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
// update product
const updateProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updateContent = req.body;
        //  console.log(productId)
        //  console.log(updateContent)
        const result = yield product_servics_1.productService.updateProductToDB(productId, updateContent);
        // console.log(result)
        res.status(200).json({
            success: true,
            message: 'Products update successfully!',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
// delete products 
const deleteProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        //  console.log(productId)
        //  console.log(updateContent)
        const result = yield product_servics_1.productService.deleteProductToDB(productId);
        // console.log(result)
        res.status(200).json({
            success: true,
            message: 'product delete successfully!',
            data: null,
        });
    }
    catch (error) {
        console.log(error);
    }
});
// search products 
const searchProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const searchRegex = new RegExp(searchTerm, "i");
        //  console.log(searchTerm)
        //  console.log(typeof(searchRegex))
        const result = yield product_servics_1.productService.searchProductToDB(searchTerm, searchRegex);
        // console.log(result)
        res.status(200).json({
            success: true,
            message: `Products matching search term ${searchTerm}fetched successfully!`,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.productController = {
    createProduct,
    allProductController,
    singleProductController,
    updateProductController,
    deleteProductController,
    searchProductController,
};
