const mongoose = require('mongoose')
const { Schema } = mongoose

const orderSchema = new Schema({
    numOrder: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    estado: { type: String, required: true },
    username: { type: String, required: true },
    direccion: { type: String, required: true },
    items: { type: Array, required: true },
  })
  

module.exports = mongoose.model('ordersCollection', orderSchema)