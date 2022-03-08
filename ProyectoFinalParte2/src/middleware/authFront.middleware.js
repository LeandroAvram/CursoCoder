const JWT = require("../util/JWT-Token");
const logger = require("../util/logger");

module.exports = async (req, res, next) => {
  let token;

  if (req.query.id) {
    token = req.query.id;
    if (!token) {
      logger.error("No existe Token por req.query.id");
      return res.redirect("/api/login/login");
    }
  } else {
    authHeader = req.headers.authorization;
    if (!authHeader) {
      logger.error("No existe Token por authHeader");
      return res.redirect("/api/login/login");
    }
    token = authHeader.split(" ")[1];
  }

  const decodeToken = JWT.verifyToken(token);

  if (decodeToken.error) {
    logger.error("No se pudo validar TOKEN: " + decodeToken.error);
    return res.redirect("/api/login/login");
  }

  req.user = decodeToken.data;
  req.userToken = token;
  logger.info("El TOKEN se valido correctamente");
  next();
};
