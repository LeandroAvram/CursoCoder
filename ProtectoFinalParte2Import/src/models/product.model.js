const mongoose = require('mongoose')

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    phot: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
  })
  

exports.ProductDAO = mongoose.model(productCollection, productSchema)