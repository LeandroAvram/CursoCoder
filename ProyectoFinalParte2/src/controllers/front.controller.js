const DAO = require('../daos')
const faProducts = DAO.FaProducts

exports.getProductPage = async (req, res) => {
    let array = await faProducts.getAll()
    let productos = array.map((x) => {
        return {
        name: x.name,
        price: x.price,
        phot: x.phot,
        id: x.id.valueOf(),
        code: x.code,
        description: x.description
        }
     });
     console.log(productos)
    res.render('products',{productos})
}

exports.getCartPage = async (req, res) => {
    res.render('cart')
}
