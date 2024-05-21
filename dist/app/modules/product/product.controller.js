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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_servics_1 = require("./product.servics");
const joi_1 = __importDefault(require("joi"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // create a schema for joi 
        const joiSchema = joi_1.default.object({
            name: joi_1.default.string().required(),
            description: joi_1.default.string().required(),
            price: joi_1.default.number().required(),
            category: joi_1.default.string().required(),
            tags: joi_1.default.array().items(joi_1.default.string()).required(),
            variants: joi_1.default.array().items(joi_1.default.object({
                type: joi_1.default.string(),
                value: joi_1.default.string()
            })).required(),
            inventory: joi_1.default.object({
                quantity: joi_1.default.number(),
                inStock: joi_1.default.boolean()
            }).required()
        });
        const product = req.body;
        const { error } = joiSchema.validate(product);
        // console.log(error)
        // console.log(value)
        const result = yield product_servics_1.productService.createProductToDB(product);
        if (error) {
            res.status(500).json({
                success: false,
                message: 'some thing is wrong',
                error: error.details,
            });
        }
        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'some thing is wrong on data',
        });
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
