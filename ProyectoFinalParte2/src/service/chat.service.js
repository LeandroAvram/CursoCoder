const DAO = require('../daos')
const fa = DAO.FaChat

exports.getChat = async (token) => {
    const data = await fa.getAll()
    const dataSend = {
        token: token,
        mensajes: data
    }
    return dataSend
}

exports.saveChat = async (mensaje) => {
    return await fa.save(mensaje)
}


