const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  idUser: { type: String, required: true },
  username: { type: String, required: true },
  timestamp: { type: Date, required: true },
  products: { type: Array, required: true }
  })
  

module.exports = mongoose.model('cartsCollection', cartSchema)