"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_route_1 = require("./app/modules/order/order.route");
// import { productRoute } from './../dist/app/modules/product/prouct.route';
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/modules/product/product.route");
const app = (0, express_1.default)();
// all route here 
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', product_route_1.productRoute);
//  all order here 
app.use('/api', order_route_1.orderRoute);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
exports.default = app;
