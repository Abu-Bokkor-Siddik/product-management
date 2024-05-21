"use strict";
// import { productRoute } from './../dist/app/modules/product/prouct.route';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/modules/product/product.route");
const app = (0, express_1.default)();
// all route here 
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', product_route_1.productRoute);
// get all products 
app.use('/api', product_route_1.productRoute);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
exports.default = app;
