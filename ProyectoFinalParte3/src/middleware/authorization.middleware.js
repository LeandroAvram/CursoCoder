const JWT = require("../util/JWT-Token");
const logger = require("../util/logger");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    logger.error("No existe Token por authHeader");
    return res.status(401).json({
      error: "not authenticated",
    });
  }

  const token = authHeader.split(" ")[1];

  const decodeToken = JWT.verifyToken(token);

  if (decodeToken.error) {
    logger.error("No se pudo validar TOKEN: " + decodeToken.error);
    return res.status(401).json({
      error: "not authenticated",
    });
  }

  if (decodeToken.data.admin == 1) {
    req.user = decodeToken.data;
    logger.info("Usuario ADMINISTRADOR");
    next();
  } else {
    logger.error("Usuario no autorizado para acceder");
    return res.status(401).json({
      error: "user not authorized",
    });
  }
};
