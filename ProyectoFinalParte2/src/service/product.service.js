const DAO = require('../daos')
const fa = DAO.FaProducts


exports.getProduct = (id) => {
    return fa.getById(id)
}

exports.getProducts = () => {
    return fa.getAll() 
}

exports.saveProduct = (product) => {
    product.timestamp = new Date()
    return fa.save(product)
}

exports.deleteProduct = (id) => {
    return fa.deleteById(id)
}

exports.updateProduct = (product,id) => {
    return fa.upDate(product,id)
}

