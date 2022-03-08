const DAO = require('../daos')
const fa = DAO.FaCarts
const faProduct = DAO.FaProducts

exports.createCart = (idUser,username) => {

    const cart = {
        idUser,
        username,
        timestamp: new Date,
        productos: []
    }

    return fa.save(cart)
}

exports.deleteCart = (idCart) => {
    return fa.deleteById(idCart)
}

exports.getProductCartUser = async (username) => {
    const data = await fa.getUser(username)
    if(!data.length){
        return {error: "no se encuentra carrito"}
    }else{
        return data[0].products
    }
}

exports.saveProductInCart = async (username, idProduct, cant) => {

    const cart = await fa.getUser(username)
    const product = await faProduct.getById(idProduct)

    if(!cart.length){
        return {error: "no se encuentra carrito"}
    }

    const pos = cart[0].products.map(val => val.productID).indexOf(idProduct)
    
    if(pos!=-1){
        const adicion = parseInt(cart[0].products[pos].cantidad) + parseInt(cant) 
        cart[0].products[pos].cantidad = adicion
    }else{
        cart[0].products.push({"nombre": product[0].name, "precio":product[0].price, "cantidad": cant, productID: product[0].id})
    }

    return fa.upDate(cart[0],cart[0].id)

}

exports.deteProductInCart = async (username, idProduct, cant) => { 

    const cart = await fa.getUser(username)
    const product = await faProduct.getById(idProduct)

    if(!cart.length){
        return {error: "no se encuentra carrito"}
    }

    if(!product.length){
        return {error: "no se encuentra el producto"}
    }

    const pos = cart[0].products.map(val => val.productID).indexOf(idProduct)

    if(pos!=-1){
        if(cant<=cart[0].products[pos].cantidad){
            const resta = parseInt(cart[0].products[pos].cantidad) - parseInt(cant) 
            cart[0].products[pos].cantidad = resta
        }else{
            cart[0].products.splice(pos,1)
        }
    }else{
        return {error: "no se encuentra el producto en el carrito"}
    }

    return fa.upDate(cart[0],cart[0].id)
}

exports.emptyCart = async (username) => { 
    const cart = await fa.getUser(username)
    if(!cart.length){
        return {error: "no se encuentra carrito"}
    }
    cart[0].products = []
    return fa.upDate(cart[0],cart[0].id)
}


