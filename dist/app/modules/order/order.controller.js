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
exports.OrderController = void 0;
const order_servics_1 = require("./order.servics");
const joi_1 = __importDefault(require("joi"));
const product_servics_1 = require("../product/product.servics");
const orderCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        // joi schema create here
        const orderSchema = joi_1.default.object({
            email: joi_1.default.string().email().required(),
            productId: joi_1.default.string().required(),
            price: joi_1.default.number().required(),
            quantity: joi_1.default.number().required()
        });
        const order = req.body;
        // console.log(order?.productId)
        // first i find data products document
        const findProductData = yield product_servics_1.productService.singleProductToDB(order === null || order === void 0 ? void 0 : order.productId);
        const numberReduce = ((_b = (_a = findProductData === null || findProductData === void 0 ? void 0 : findProductData.inventory) === null || _a === void 0 ? void 0 : _a.quantity) !== null && _b !== void 0 ? _b : 0) - (order === null || order === void 0 ? void 0 : order.quantity);
        // console.log(numberReduce)
        if (numberReduce < 0) {
            res.status(500).json({
                success: false,
                message: 'Insufficient quantity available in inventory',
            });
        }
        if (numberReduce == 0) {
            const findValueIsZero = yield product_servics_1.productService.updateIsZero(order === null || order === void 0 ? void 0 : order.productId, numberReduce);
            res.status(200).json({
                success: true,
                message: 'stock update successfully!',
            });
        }
        // update here 
        if (numberReduce > 0) {
            const reduce = ((_d = (_c = findProductData === null || findProductData === void 0 ? void 0 : findProductData.inventory) === null || _c === void 0 ? void 0 : _c.quantity) !== null && _d !== void 0 ? _d : 0) - (order === null || order === void 0 ? void 0 : order.quantity);
            const result = yield product_servics_1.productService.updateProductReduceToDB(order === null || order === void 0 ? void 0 : order.productId, reduce);
            const { error } = orderSchema.validate(order);
            const results = yield order_servics_1.orderServics.createOrderToDB(order);
            if (error) {
                res.status(500).json({
                    success: false,
                    message: 'some thing is wrong',
                    error: error.details,
                });
            }
            res.status(200).json({
                success: true,
                message: 'Order created successfully!',
                data: results,
            });
        } //if ar 
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'some thing is wrong',
        });
    }
});
// all order controller
const allOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g;
    try {
        if ((_e = req.query) === null || _e === void 0 ? void 0 : _e.email) {
            const email = (_f = req.query) === null || _f === void 0 ? void 0 : _f.email;
            const result = yield order_servics_1.orderServics.emailOrderToDB(email);
            // console.log(result)
            if (result.length == 0) {
                res.status(400).json({
                    success: false,
                    message: 'Order not found',
                });
            }
            else {
                res.status(200).json({
                    success: true,
                    message: 'Orders fetched successfully for user email!',
                    data: result,
                });
            }
        }
        if (!((_g = req.query) === null || _g === void 0 ? void 0 : _g.email)) {
            const result = yield order_servics_1.orderServics.allOrderToDB();
            res.status(200).json({
                success: true,
                message: 'Order fetched successfully!',
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'something is wrong',
        });
    }
});
exports.OrderController = {
    orderCreate,
    allOrderController,
    // emailOrderController,
};
