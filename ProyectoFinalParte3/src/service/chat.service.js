const DAO = require("../daos");
const fa = DAO.FaChat;
const logger = require("../util/logger");

exports.getChat = async (token) => {
  logger.info("Se obtienen mensajes");
  const data = await fa.getAll();
  const dataSend = {
    token: token,
    mensajes: data,
  };
  return dataSend;
};

exports.saveChat = async (mensaje) => {
  logger.info("Se actualizan mensajes");
  return await fa.save(mensaje);
};
