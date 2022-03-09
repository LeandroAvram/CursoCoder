const productService = require("../service/product.service");
const cartService = require("../service/cart.service");
const logger = require("../util/logger");

exports.getProductPageData = async (token) => {
  logger.info("Se obtienen productos a renderizar en la pagina de productos");
  const productosArray = await productService.getProducts();
  const productos = productosArray.map((x) => {
    return {
      name: x.name,
      price: x.price,
      photo: x.photo,
      id: x.id.valueOf(),
      description: x.description,
    };
  });
  const dataSend = { productos: productos, token: token };
  return dataSend;
};

exports.getCartPageData = async (token, username) => {
  logger.info("Se obtienen productos a renderizar en la pagina de carrito");
  const productosArray = await cartService.getProductCartUser(username);
  const productos = productosArray.map((x) => {
    return {
      nombre: x.nombre,
      precio: x.precio,
      cantidad: x.cantidad,
      productID: x.productID,
      total: x.precio * x.cantidad,
    };
  });
  const dataSend = { productos: productos, token: token };
  return dataSend;
};
