const userService = require("../service/user.service");
const logger = require("../util/logger");

exports.registerUser = async (req, res) => {
  const {
    name,
    direccion,
    edad,
    numline,
    password2,
    foto,
    username,
    password,
    admin,
  } = req.body;

  if (
    !name ||
    !direccion ||
    !edad ||
    !numline ||
    !password ||
    !password2 ||
    !username ||
    !admin
  ) {
    logger.error("Los parametros del usuario enviados son incorrectos");
    return res
      .status(400)
      .send({ error: "Los parametros del producto enviados son incorrectos" });
  }

  if (password != password2) {
    logger.error("Las contraseñas no son iguales");
    return res.status(400).send({ error: "password validation error" });
  }

  const user = {
    name,
    direccion,
    edad,
    numline,
    foto,
    username,
    password,
    admin,
  };

  return res.status(200).json(await userService.createUser(user));
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    logger.error("Los parametros del usuario enviados son incorrectos");
    return res
      .status(400)
      .send({ error: "Los parametros del producto enviados son incorrectos" });
  }

  const user = { username, password };
  return res.status(200).json(await userService.loginUser(user));
};

exports.registerUserFront = async (req, res) => {
  const {
    name,
    direccion,
    edad,
    numline,
    password2,
    foto,
    username,
    password,
  } = req.body;

  if (
    !name ||
    !direccion ||
    !edad ||
    !numline ||
    !password ||
    !password2 ||
    !username
  ) {
    logger.error("Los parametros del usuario enviados son incorrectos");
    res.render("register-error");
  }

  if (password != password2) {
    logger.error("Las contraseñas no son iguales");
    res.render("register-error");
  }
  const admin = 0;
  const user = {
    name,
    direccion,
    edad,
    numline,
    foto,
    username,
    password,
    admin,
  };

  const token = await userService.createUser(user);

  if (token.error) {
    logger.error("Error: " + token.error);
    return res.render("register-error");
  }

  return res.redirect("/front/productos?id=" + token);
};

exports.loginUserFront = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    logger.error("Los parametros del usuario enviados son incorrectos");
    res.render("login-error");
  }

  const user = { username, password };

  const token = await userService.loginUser(user);

  if (token.error) {
    logger.error("Error: " + token.error);
    return res.render("login-error");
  }

  return res.redirect("/front/productos?id=" + token);
};

exports.updateImageUser = (req, res) => {
  if (!req.file) {
    logger.error("Archivo no se guardado");
    return res.send({ success: false });
  } else {
    logger.info("Archivo guardado correctamente");
    return res.send({ nombre: req.file.filename });
  }
};
