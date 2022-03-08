const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb");
const Chat = require("../../models/chat.model");

class ChatsDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(Chat);
  }
  async disconnect() {}
}

module.exports = ChatsDaoMongoDb;
