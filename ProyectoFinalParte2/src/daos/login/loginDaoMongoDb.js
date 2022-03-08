const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb");
const User = require("../../models/user.model");

class UserDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(User);
  }
  async disconnect() {}
}

module.exports = UserDaoMongoDb;
