const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
  mensaje: { type: String, required: true },
  fecha: { type: Date, required: true },
  author: { type: Array, required: true }
  })
module.exports = mongoose.model('cCollection', chatSchema)