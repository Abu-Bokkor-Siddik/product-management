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
exports.productService = void 0;
const product_model_1 = require("./product.model");
const createProductToDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.create(product);
    return result;
});
// all products 
const allProductToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.find();
    return result;
});
// single products 
const singleProductToDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findOne({ _id });
    return result;
});
// single update products 
const updateProductToDB = (_id, updateContent) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findByIdAndUpdate({ _id }, updateContent, { new: true });
    return result;
});
// delete product 
const deleteProductToDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findByIdAndDelete({ _id });
    return result;
});
// search products
const searchProductToDB = (searchTerm, searchRegex) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.find({
        $or: [
            { name: searchRegex },
            { description: searchRegex },
            { category: searchRegex }
        ]
    });
    return result;
});
exports.productService = {
    createProductToDB,
    allProductToDB,
    singleProductToDB,
    updateProductToDB,
    deleteProductToDB,
    searchProductToDB,
};
