const mongoose = require("mongoose");
const admin = require("firebase-admin");
const logger = require("../util/logger");
const serviceAccount = require("../config/coderhouse-c68fd-firebase-adminsdk-2kd96-320b456cff.json");

const ProductsDaoArchivo = require("./products/productsDaoArchivo");
const ProductsDaoMongoDb = require("./products/productsDaoMongoDb");
const ProductsDaoFirebase = require("./products/productsDaoFirebase");

const CartsDaoArchivo = require("./carts/CartsDaoArchivo");
const CartsDaoMongoDb = require("./carts/CartsDaoMongoDb");
const CartsDaoFirebase = require("./carts/CartsDaoFirebase");

const UserDaoMongoDb = require("./login/loginDaoMongoDb");
const OrderDaoMongoDb = require("./orders/ordersDaoMongoDb");
const ChatDaoMongoDb = require("./chat/chatMongoDb");

const PERCISTENCIA = process.env.PERCISTENCIA;
const HOSTMONGO = process.env.HOSTMONGO;

switch (PERCISTENCIA) {
  case "mongodb":
    logger.info("Se Utiliza percistencia MongoDb en el host: " + HOSTMONGO);
    mongoose
      .connect(HOSTMONGO, {
        serverSelectionTimeoutMS: 5000,
      })
      .then(() => {
        logger.info("Base de datos conectada");
      });
    faCarts = new CartsDaoMongoDb();
    faProducts = new ProductsDaoMongoDb();
    faLogin = new UserDaoMongoDb();
    faOrder = new OrderDaoMongoDb();
    faChat = new ChatDaoMongoDb();
    break;
  case "archivo":
    logger.info("Se Utiliza percistencia Archivos");
    faCarts = new CartsDaoArchivo();
    faProducts = new ProductsDaoArchivo();
    break;
  case "firebase":
    logger.info("Se Utiliza percistencia Firebase");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    const db = admin.firestore();
    faCarts = new CartsDaoFirebase(db);
    faProducts = new ProductsDaoFirebase(db);
    break;
}

module.exports = {
  FaCarts: faCarts,
  FaProducts: faProducts,
  FaLogin: faLogin,
  FaOrder: faOrder,
  FaChat: faChat,
};
