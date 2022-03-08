const ContenedorArchivo = require("../../contenedores/ContenedorArchivo");

class ProductsDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("src/resource/products.txt");
  }

  async disconnect() {}
}

module.exports = ProductsDaoArchivo;
