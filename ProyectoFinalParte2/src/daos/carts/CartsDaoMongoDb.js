const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb");
const Cart = require("../../models/cart.model");

class CartsDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(Cart);
  }

  async disconnect() {}
}

module.exports = CartsDaoMongoDb;
