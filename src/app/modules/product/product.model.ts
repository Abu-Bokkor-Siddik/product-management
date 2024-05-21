import { Schema, model } from 'mongoose';
import { Product, Variantes } from './product.interface';
const VariantsSchema= new Schema<Variantes>({
type:{
    type:String,
    required:true
},
value:{
    type:String,
    required:true
}
})

const productSchema=new Schema<Product>({
name:{
    type:String,
    required:true,
    unique:true
},
description:{
    type:String,
    required:true
},
price:{
    type:Number,
    required:true
},
category:{
    type:String,
    required:true
},
tags:{
type:[String],
required:true
},
variants:{
    type:[VariantsSchema],
    required:true
},
inventory:{
    quantity:{
        type:Number,
        required:true
    },
    inStock:{
        type:Boolean,
        required:true
    }
}
})

 export const ProductModel=model<Product>('Products',productSchema)
