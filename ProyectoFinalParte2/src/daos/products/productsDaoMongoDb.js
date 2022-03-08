const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb");
const Product = require("../../models/product.model");

class ProductsDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(Product);
  }
  async disconnect() {}
}

module.exports = ProductsDaoMongoDb;
