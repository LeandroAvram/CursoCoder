const ContenedorArchivo = require('../../contenedores/ContenedorArchivo')

class CartsDaoArchivo extends ContenedorArchivo {
    constructor(){
        super('src/resource/carts.txt')
    }

    async disconnect(){

    }
}

module.exports = CartsDaoArchivo