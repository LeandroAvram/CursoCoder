const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    categoría: { type: String, required: false },
    code: { type: String, required: true },
    phot: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    timestamp: { type: Date, required: true }
  })
  

module.exports = mongoose.model('productsCollection', productSchema)