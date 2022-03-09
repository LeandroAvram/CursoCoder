const bCrypt = require("bcrypt");

exports.createHash = (e) => {
  return bCrypt.hashSync(e, bCrypt.genSaltSync(10), null);
};

exports.isValidPassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
};
