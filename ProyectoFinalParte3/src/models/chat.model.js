const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  username: { type: String, required: true },
  timestamp: { type: Date, required: true },
  mensaje: { type: String, required: true },
});

module.exports = mongoose.model("chatCollection", chatSchema);
