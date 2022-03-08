const frontSerivice = require("../service/frontData.service");
const cartService = require("../service/cart.service");
const orderService = require("../service/order.service");
const chatService = require("../service/chat.service");

exports.getProductPage = async (req, res) => {
  const data = await frontSerivice.getProductPageData(req.userToken);
  return res.render("products", { data });
};

exports.getCartPage = async (req, res) => {
  const data = await frontSerivice.getCartPageData(
    req.userToken,
    req.user.username
  );
  return res.render("cart", { data });
};

exports.getChatPage = async (req, res) => {
  const data = await chatService.getChat(req.userToken);
  return res.render("mensajes", { data });
};

exports.saveCart = async (req, res) => {
  const { idProduct, cant } = req.body;

  if (!idProduct || !cant) {
    logger.error("Los parametros del producto enviados son incorrectos");
    return res
      .status(400)
      .send({ error: "Los parametros para añadir son incorrectos" });
  }

  return res
    .status(200)
    .send(
      await cartService.saveProductInCart(req.user.username, idProduct, cant)
    );
};

exports.deleteProductCart = async (req, res) => {
  const { idProduct, cant } = req.body;

  if (!idProduct || !cant) {
    logger.error("Los parametros del producto enviados son incorrectos");
    return res
      .status(400)
      .send({ error: "Los parametros para añadir son incorrectos" });
  }

  return res
    .status(200)
    .send(
      await cartService.deteProductInCart(req.user.username, idProduct, cant)
    );
};

exports.orderCart = async (req, res) => {
  const { direccion } = req.body;
  const data = {
    direccion: direccion,
    username: req.user.username,
  };
  return res.status(200).send(await orderService.saveOrder(data));
};

exports.getRegisterPage = (req, res) => {
  return res.sendFile(process.cwd() + "/public/register.html");
};

exports.getLoginPage = (req, res) => {
  return res.sendFile(process.cwd() + "/public/login.html");
};

exports.getInfoServer = (req, res) => {
  const args = process.argv;
  const datainfo = {
    numeros: args.slice(2),
    path: process.cwd(),
    pathcarpeta: process.execPath.split("/").pop(),
    SO: process.platform,
    pid: process.pid,
    version: process.version,
    memoria: process.memoryUsage(),
  };
  return res.render("infoServer", { datainfo });
};
