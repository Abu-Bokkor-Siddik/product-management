"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoute = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const route = express_1.default.Router();
// create order 
route.post('/orders', order_controller_1.OrderController.orderCreate);
// get all order and find by email
route.get('/orders', order_controller_1.OrderController.allOrderController);
exports.orderRoute = route;
