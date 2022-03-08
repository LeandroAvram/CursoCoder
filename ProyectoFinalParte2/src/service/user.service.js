const DAO = require('../daos')
const fa = DAO.FaLogin
const JWT = require('../util/JWT-Token')
const HASH = require('../util/Hash')
const CartNew = require("./cart.service")

exports.createUser = async (user) => {
    const usuario = await fa.getUser(user.username)

    if (usuario[0]) {
        return {error:"usuario existente",code:1}
    }
    user.password = HASH.createHash(user.password)
    const userData = await fa.save(user)
    await CartNew.createCart(userData.id,user.username)

    return JWT.generateToken(user)

}

exports.loginUser = async (userData) => {
    const { username, password } = userData

    const user = await fa.getUser(username)

    if (!user[0]) {
        return {error:"usuario no encontrado",code:1}
    }

    if (!HASH.isValidPassword(user[0], password)) {
        return {error:"usuario y/o password incorrectos",code:1}
    }

    return JWT.generateToken(user[0])
}

