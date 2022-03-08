const jwt = require("jsonwebtoken");
const logger = require("./logger");

const PRIVATE_KEY = process.env.PRIVATE_KEYJWT;

exports.generateToken = (user) => {
  const token = jwt.sign({ data: user }, PRIVATE_KEY, { expiresIn: "24h" });
  logger.info("Token generado correctamente");
  return token;
};

exports.verifyToken = (token) => {
  return jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    if (err) {
      logger.error("Error invalid token");
      return { error: "invalid token" };
    }
    return decoded;
  });
};
