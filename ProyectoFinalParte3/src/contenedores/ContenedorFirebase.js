const logger = require("../util/logger");

class ContenedorMongoDb {
  constructor(DAO) {
    this.DAO = DAO;
  }

  async save(elem) {
    try {
      return await this.DAO.add(elem);
    } catch (error) {
      logger.error(`Error en operación de base de datos ${error}`);
      return false;
    }
  }

  async getById(number) {
    try {
      const data = await this.DAO.doc(number).get();
      return { id: data.id, ...data.data() };
    } catch (error) {
      logger.error(`Error en operación de base de datos ${error}`);
      return false;
    }
  }

  async getAll() {
    try {
      const arrayData = [];
      const snapshot = await this.DAO.get();
      snapshot.forEach((doc) => {
        arrayData.push({ id: doc.id, ...doc.data() });
      });
      return arrayData;
    } catch (error) {
      logger.error(`Error en operación de base de datos ${error}`);
      return false;
    }
  }

  async deleteById(number) {
    try {
      return await this.DAO.doc(number).delete();
    } catch (error) {
      logger.error(`Error en operación de base de datos ${error}`);
      return false;
    }
  }

  async upDate(json, id) {
    try {
      return await this.DAO.doc(id).update(json);
    } catch (error) {
      logger.error(`Error en operación de base de datos ${error}`);
      return false;
    }
  }

  async postProductCarts(data, id) {
    try {
      const dataC = await this.DAO.doc(id).get();
      const dataCarts = { id: dataC.id, ...dataC.data() };
      if (data != []) {
        dataCarts.productos.push(data);
        return await this.DAO.doc(id).update(dataCarts);
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
      const dataC = await this.DAO.doc(idCarts).get();
      const dataCarts = { id: dataC.id, ...dataC.data() };

      if (dataCarts.productos != []) {
        dataCarts.productos = dataCarts.productos.filter(function (e) {
          return e.code !== idProduct;
        });
        return await this.DAO.doc(idCarts).update(dataCarts);
      } else {
        return false;
      }
    } catch (error) {
      logger.error(`Error en operación de base de datos ${error}`);
      return false;
    }
  }
}

module.exports = ContenedorMongoDb;
