const ContenedorFirebase = require('../../contenedores/ContenedorFirebase')

class CartsDaoFirebase extends ContenedorFirebase {
    constructor(db){
        super(db.collection('cartsCollection'))
    }

    async disconnect(){

    }
}

module.exports = CartsDaoFirebase