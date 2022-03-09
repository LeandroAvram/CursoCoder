const logger = require("../util/logger");

class ContenedorMongoDb {
  constructor(DAO) {
    this.DAO = DAO;
  }

  async save(elem) {
    try {
      return await this.DAO.create(elem);
    } catch (error) {
      logger.error(`Error en operación de base de datos ${error}`);
      return false;
    }
  }

  async getById(number) {
    try {
      return await this.DAO.find({ _id: number });
    } catch (error) {
      logger.error(`Error en operación de base de datos ${error}`);
      return false;
    }
  }

  async getAll() {
    try {
      return await this.DAO.find({});
    } catch (error) {
      logger.error(`Error en operación de base de datos ${error}`);
      return false;
    }
  }

  async deleteById(number) {
    try {
      return await this.DAO.deleteOne({ _id: number });
    } catch (error) {
      logger.error(`Error en operación de base de datos ${error}`);
      return false;
    }
  }

  async deleteAll() {
    try {
      return await this.DAO.deleteMany({});
    } catch (error) {
      logger.error(`Error en operación de base de datos ${error}`);
      return false;
    }
  }

  async upDate(json, id) {
    try {
      return await this.DAO.updateOne({ _id: id }, { $set: json });
    } catch (error) {
      logger.error(`Error en operación de base de datos ${error}`);
      return false;
    }
  }

  async postProductCarts(data, id) {
    try {
      const dataCarts = await this.DAO.find({ _id: id });
      const dataProducts = dataCarts[0].products;
      if (data != []) {
        dataProducts.push(data);
        await this.DAO.updateOne({ _id: id }, { products: dataProducts });
      } else {
        return false;
      }
    } catch (error) {
      logger.error(`Error en operación de base de datos ${error}`);
      return false;
    }
  }

  async deleteProductCarts(idCarts, idProduct) {
    try {
      const dataCarts = await this.DAO.find({ _id: idCarts });
      let dataProducts = dataCarts[0].products;

      if (dataCarts != []) {
        dataProducts = dataProducts.filter(function (e) {
          return e.code !== idProduct;
        });
        await this.DAO.updateOne({ _id: idCarts }, { products: dataProducts });
      } else {
        return false;
      }
    } catch (error) {
      logger.error(`Error en operación de base de datos ${error}`);
      return false;
    }
  }

  async getUser(username) {
    try {
      return await this.DAO.find({ username: username });
    } catch (error) {
      logger.error(`Error en operación de base de datos ${error}`);
      return error;
    }
  }
}

module.exports = ContenedorMongoDb;
