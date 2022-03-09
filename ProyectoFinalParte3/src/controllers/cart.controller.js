const cartService = require("../service/cart.service");
const logger = require("../util/logger");

exports.postNewCarrito = async (req, res) => {
  const { idUser, username } = req.body;

  if (!idUser || !username) {
    logger.error("Los parametros del carrito enviados son incorrectos");
    return res
      .status(400)
      .send({ error: "Los parametros del carrito enviados son incorrectos" });
  }

  return res.status(200).send(await cartService.createCart(idUser, username));
};

exports.deleteCarrito = async (req, res) => {
  const idCarrito = req.params.id;
  return res.status(200).send(await cartService.deleteCart(idCarrito));
};

exports.getCarrito = async (req, res) => {
  const products = await cartService.getProductCartUser(req.params.username);

  if (products.error) {
    logger.error("Error en obtener carrito de usuario:" + req.params.username);
    logger.error("Error: " + products.error);
    return res.status(400).send({ error: products.error });
  }

  if (!products.length) {
    logger.info(
      "No se encuentran productos en el carrito de usuario:" +
        req.params.username
    );
    return res
      .status(200)
      .send({ mensaje: "no se encuentran productos en el carrito" });
  }

  return res.status(200).send({ products });
};

exports.postProductCarrito = async (req, res) => {
  const { username, idProduct, cant } = req.body;

  if (!username || !idProduct || !cant) {
    logger.error("Los parametros del carrito enviados son incorrectos");
    return res
      .status(400)
      .send({ error: "Los parametros para añadir son incorrectos" });
  }

  return res
    .status(200)
    .send(await cartService.saveProductInCart(username, idProduct, cant));
};

exports.deleteProductOfCarrito = async (req, res) => {
  const { username, idProduct, cant } = req.body;

  if (!username || !idProduct || !cant) {
    logger.error("Los parametros del carrito enviados son incorrectos");
    return res
      .status(400)
      .send({ error: "Los parametros para añadir son incorrectos" });
  }

  return res
    .status(200)
    .send(await cartService.deteProductInCart(username, idProduct, cant));
};

exports.emptyCart = async (req, res) => {
  const { username } = req.body;
  if (!username) {
    logger.error("Los parametros del carrito enviados son incorrectos");
    return res
      .status(400)
      .send({ error: "Los parametros para vaciar son incorrectos" });
  }
  return res.status(200).send(await cartService.emptyCart(username));
};
