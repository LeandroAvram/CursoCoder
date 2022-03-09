const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb");
const Order = require("../../models/order.model");

class OrdersDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(Order);
  }
  async disconnect() {}
}

module.exports = OrdersDaoMongoDb;
