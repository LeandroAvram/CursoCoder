const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  products: { type: Array, required: true }
  })
  

module.exports = mongoose.model('cartsCollection', cartSchema)