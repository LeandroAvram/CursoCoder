const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const logger = require("./logger");

const DIR_AVATAR = process.env.DIR_AVATAR;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR_AVATAR);
  },
  filename: function (req, file, cb) {
    const data = file.originalname.split(".");
    const name = uuidv4();
    logger.info("Imagen guardada con el nombre de: " + name + "." + data[1]);
    cb(null, name + "." + data[1]);
  },
});

const upload = multer({ storage });
module.exports = upload;
