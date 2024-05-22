import { Product } from './product.interface'
import { ProductModel } from './product.model'

const createProductToDB = async (product: Product) => {
  const result = await ProductModel.create(product)
  return result
}
// all products
const allProductToDB = async () => {
  const result = await ProductModel.find()
  return result
}
// single products
const singleProductToDB = async (_id: string) => {
  const result = await ProductModel.findOne({ _id })
  return result
}
// single update products
const updateProductToDB = async (_id: string, updateContent: Product) => {
  const result = await ProductModel.findByIdAndUpdate({ _id }, updateContent, {
    new: true,
  })
  return result
}
// single update products quenty reduce
const updateProductReduceToDB = async (_id: string, quantity: number) => {
  // console.log(_id,'here')
  // console.log(quantity,'quantity')
  const result = await ProductModel.findByIdAndUpdate(
    { _id },
    {
      $set: {
        'inventory.quantity': quantity,
        'inventory.inStock': true,
      },
    },
    { new: true },
  )

  return result
}
// single quentity 0 hole
const updateIsZero = async (_id: string, quantity: number) => {
  const result = await ProductModel.findByIdAndUpdate(
    { _id },
    {
      $set: {
        'inventory.quantity': quantity,
        'inventory.inStock': false,
      },
    },
    { new: true },
  )

  return result
}
// delete product
const deleteProductToDB = async (_id: string) => {
  const result = await ProductModel.findByIdAndDelete({ _id })
  return result
}
// search products
const searchProductToDB = async (searchTerm: string, searchRegex: object) => {
  const result = await ProductModel.find({
    $or: [
      { name: searchRegex },
      { description: searchRegex },
      { category: searchRegex },
    ],
  })
  return result
}
export const productService = {
  createProductToDB,
  allProductToDB,
  singleProductToDB,
  updateProductToDB,
  deleteProductToDB,
  searchProductToDB,
  updateProductReduceToDB,
  updateIsZero,
}
