const DAO = require("../daos");
const fa = DAO.FaProducts;
const logger = require("../util/logger");

exports.getProduct = (id) => {
  logger.info("Se obtienen producto con id: " + id);
  return fa.getById(id);
};

exports.getProducts = () => {
  logger.info("Se obtienen todos los productos");
  return fa.getAll();
};

exports.saveProduct = (product) => {
  logger.info("Se guarda un nuevo producto");
  product.timestamp = new Date();
  return fa.save(product);
};

exports.deleteProduct = (id) => {
  logger.info("Se elimina un producto con id: " + id);
  return fa.deleteById(id);
};

exports.updateProduct = (product, id) => {
  logger.info("Se actualiza un producto con id: " + id);
  return fa.upDate(product, id);
};
