"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const VariantsSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    variants: {
        type: [VariantsSchema],
        required: true,
        _id: false
    },
    inventory: {
        quantity: {
            type: Number,
            required: true
        },
        inStock: {
            type: Boolean,
            required: true
        }
    }
});
exports.ProductModel = (0, mongoose_1.model)('Products', productSchema);
