const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  direccion: { type: String, required: true },
  edad: { type: Number, required: true },
  numline: { type: Number, required: true },
  foto: { type: String, required: false },
  admin: { type: Number, required: true },
});

module.exports = mongoose.model("userCollection", userSchema);
