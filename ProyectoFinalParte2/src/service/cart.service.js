const DAO = require("../daos");
const fa = DAO.FaCarts;
const faProduct = DAO.FaProducts;
const logger = require("../util/logger");

exports.createCart = (idUser, username) => {
  const cart = {
    idUser,
    username,
    timestamp: new Date(),
    productos: [],
  };
  logger.info("Se crea un nuevo carrito con los siguientes datos " + cart);
  return fa.save(cart);
};

exports.deleteCart = (idCart) => {
  logger.info("Se elimina el carrito con id: " + idCart);
  return fa.deleteById(idCart);
};

exports.getProductCartUser = async (username) => {
  const data = await fa.getUser(username);
  if (!data.length) {
    logger.info("No se encuentra carrito para el usuario: " + username);
    return { error: "no se encuentra carrito" };
  } else {
    logger.info(
      "Se obtienen los porductos del carrito correctamente para el user: " +
        username
    );
    return data[0].products;
  }
};

exports.saveProductInCart = async (username, idProduct, cant) => {
  const cart = await fa.getUser(username);
  const product = await faProduct.getById(idProduct);

  if (!cart.length) {
    logger.info("No se encuentra carrito para el usuario: " + username);
    return { error: "no se encuentra carrito" };
  }

  const pos = cart[0].products.map((val) => val.productID).indexOf(idProduct);

  if (pos != -1) {
    const adicion = parseInt(cart[0].products[pos].cantidad) + parseInt(cant);
    cart[0].products[pos].cantidad = adicion;
  } else {
    cart[0].products.push({
      nombre: product[0].name,
      precio: product[0].price,
      cantidad: cant,
      productID: product[0].id,
    });
  }

  logger.info("Se actualiza el carrito para el usuario: " + username);
  return fa.upDate(cart[0], cart[0].id);
};

exports.deteProductInCart = async (username, idProduct, cant) => {
  const cart = await fa.getUser(username);
  const product = await faProduct.getById(idProduct);

  if (!cart.length) {
    logger.info("No se encuentra carrito para el usuario: " + username);
    return { error: "no se encuentra carrito" };
  }

  if (!product.length) {
    logger.info("No se encuentran productos");
    return { error: "no se encuentra el producto" };
  }

  const pos = cart[0].products.map((val) => val.productID).indexOf(idProduct);

  if (pos != -1) {
    if (cant <= cart[0].products[pos].cantidad) {
      const resta = parseInt(cart[0].products[pos].cantidad) - parseInt(cant);
      cart[0].products[pos].cantidad = resta;
    } else {
      cart[0].products.splice(pos, 1);
    }
  } else {
    logger.error("No se encuentran el producto en el carrito");
    return { error: "no se encuentra el producto en el carrito" };
  }
  logger.info("Se actualiza el carrito para el usuario: " + username);
  return fa.upDate(cart[0], cart[0].id);
};

exports.emptyCart = async (username) => {
  const cart = await fa.getUser(username);
  if (!cart.length) {
    logger.info("No se encuentra carrito para el usuario: " + username);
    return { error: "no se encuentra carrito" };
  }
  logger.info("Se vacia el carrito para el usuario: " + username);
  cart[0].products = [];
  return fa.upDate(cart[0], cart[0].id);
};
