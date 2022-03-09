const ContenedorFirebase = require('../../contenedores/ContenedorFirebase')

class ProductsDaoFirebase extends ContenedorFirebase {
    constructor(db){
        super(db.collection('productsCollection'))
    }

    async disconnect(){

    }
}

module.exports = ProductsDaoFirebase