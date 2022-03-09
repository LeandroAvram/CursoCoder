const orderService = require("../service/order.service");

exports.getProduct = async (req, res) => {
  const id = req.params.id;
  if (!req.params.id) {
    return res.status(200).send(await orderService.getOrders());
  } else {
    return res.status(200).send(await orderService.getOrder(id));
  }
};

exports.postProduct = async (req, res) => {
  const { username, direccion } = req.body;

  if (!username || !direccion) {
    logger.error("Los parametros del producto enviados son incorrectos");
    return res
      .status(400)
      .send({ error: "Los parametros del producto enviados son incorrectos" });
  }

  const jsonOrder = { username, direccion };

  return res.status(200).send(await orderService.saveOrder(jsonOrder));
};
