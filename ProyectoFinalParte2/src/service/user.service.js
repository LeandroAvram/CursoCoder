const DAO = require('../daos')
const fa = DAO.FaLogin
const JWT = require('../util/JWT-Token')
const HASH = require('../util/Hash')
const CartNew = require("./cart.service")
const logger = require("../util/logger");

exports.createUser = async (user) => {
    const usuario = await fa.getUser(user.username)

    if (usuario[0]) {
        logger.error('El usuario ya se encuentra registrado: ' + usuario)
        return {error:"usuario existente",code:1}
    }
    user.password = HASH.createHash(user.password)
    const userData = await fa.save(user)
    await CartNew.createCart(userData.id,user.username)
    logger.info('El usuario se creo correctamente: ' + usuario)
    return JWT.generateToken(user)

}

exports.loginUser = async (userData) => {
    const { username, password } = userData

    const user = await fa.getUser(username)

    if (!user[0]) {
        logger.error('El usuario no fue encontrado: ' + username)
        return {error:"usuario no encontrado",code:1}
    }

    if (!HASH.isValidPassword(user[0], password)) {
        logger.error('El usuario y/o password incorrectos: ' + username)
        return {error:"usuario y/o password incorrectos",code:1}
    }

    logger.info('El usuario se logeo correctamente: ' + username)
    return JWT.generateToken(user[0])
}

