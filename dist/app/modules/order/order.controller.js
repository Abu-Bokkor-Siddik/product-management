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
exports.OrderController = void 0;
const order_servics_1 = require("./order.servics");
const orderCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        const result = yield order_servics_1.orderServics.createOrderToDB(order);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
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
