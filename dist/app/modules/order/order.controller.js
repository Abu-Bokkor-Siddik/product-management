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
const orderCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderSchema = joi_1.default.object({
            email: joi_1.default.string().email().required(),
            productId: joi_1.default.string().required(),
            price: joi_1.default.number().required(),
            quantity: joi_1.default.number().required()
        });
        const order = req.body;
        const { error } = orderSchema.validate(order);
        const result = yield order_servics_1.orderServics.createOrderToDB(order);
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
            data: result,
        });
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
    var _a, _b, _c;
    try {
        if ((_a = req.query) === null || _a === void 0 ? void 0 : _a.email) {
            const email = (_b = req.query) === null || _b === void 0 ? void 0 : _b.email;
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
                    message: 'email fetched successfully!',
                    data: result,
                });
            }
        }
        if (!((_c = req.query) === null || _c === void 0 ? void 0 : _c.email)) {
            const result = yield order_servics_1.orderServics.allOrderToDB();
            res.status(200).json({
                success: true,
                message: 'Order fetched successfully!',
                data: result,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.OrderController = {
    orderCreate,
    allOrderController,
    // emailOrderController,
};
