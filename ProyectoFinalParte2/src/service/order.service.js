const DAO = require('../daos')
const fa = DAO.FaOrder
const faCart = DAO.FaCarts
const mail = require('../util/sendmail')
const cartService = require("./cart.service")

exports.getOrder = (id) => {
    return fa.getById(id)
}

exports.getOrders = () => {
    return fa.getAll() 
}

exports.saveOrder = async (data) => {
    const cart = await faCart.getUser(data.username)
    const order = {
        numOrder: Math.floor((Math.random() * (10000 - 0 + 1)) + 0),
        timestamp: new Date(),
        estado: "generada",
        username: data.username,
        direccion: data.direccion,
        items: cart[0].products
    }

    const mailOptions = {
        from: 'Servidor Node.js Laurianne Klocko',
        to: "laurianne.klocko90@ethereal.email",
        subject: 'Nueva Orden Generada',
        html: JSON.stringify(order)
    }
    
    mail(mailOptions)
    await cartService.emptyCart(data.username)
    return fa.save(order)
}