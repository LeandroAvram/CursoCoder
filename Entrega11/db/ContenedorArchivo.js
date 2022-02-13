const fs = require('fs')

class ContenedorArchivo{

    constructor(ruta) {
        this.ruta = ruta
    }

    async saveCommun(array = []) {
        try {
            const jsonElem = JSON.stringify(array, null, 2)
            await fs.promises.writeFile(this.ruta, jsonElem)
        } catch (error){
            console.log(error);
        }
    }

    async read() {
        try {
            const json = await fs.promises.readFile(this.ruta)
            return JSON.parse(json)  
        } catch (error) {
            return []
        }
    }

    async save(elem) {
        let numid
        const array = await this.read()
        if(array.length == 0) {
            elem.id = array.length + 1
        }else{
            numid = array[array.length - 1].id + 1
            elem.id = numid
        } 
        array.push(elem)
        await this.saveCommun(array)
        return elem
    }

    async getById(number){
        let object = null;
        const array = await this.read()
         array.forEach(element => {
            if(element.id == number){
                object = element
            }
        });
        return object
    }

    async getAll() {
        return await this.read()
    }

    async deleteById(number) {
        const array = await this.read()
        array.forEach((element, i) => {
            if(element.id == number){
                array.splice( i, 1 );
            }
        });
        await this.saveCommun([])
        await this.saveCommun(array)
    }

    async deleteAll(){
        await this.saveCommun([])
    }

    async saveElementID(elem, idex) {
        const array = await this.read() 
        array[idex] = elem
        await this.saveCommun(array)
        return 
    }

    async upDate(elem,idex){
    const { name, description, code, phot, price, stock } = elem
    const arrayProduct = await this.getAll()
     const index = arrayProduct.findIndex( result => result.id == idex )

        if( index > -1){
            arrayProduct[index].timestamp = new Date
            arrayProduct[index].name = name
            arrayProduct[index].description = description
            arrayProduct[index].code = code
            arrayProduct[index].phot = phot
            arrayProduct[index].price = price
            arrayProduct[index].stock = stock
            await this.saveElementID(arrayProduct[index],index)
            return arrayProduct[index]
        }
        return false
    }

    async postProductCarts(data,id){
        const arrayProduct = await this.getAll()
        const index = arrayProduct.findIndex( result => result.id == id )

        if( index > -1){
            arrayProduct[index].productos = dato
            return await this.saveElementID(arrayProduct[index],index)
        }
        return false
    }

    async deleteProductCarts(idCarts,idproduct){

        const arrayCarritos = await this.getAll()
        const carrito = arrayCarritos.find( result => result.id == idCarts )
        const carritoIndex = arrayCarritos.findIndex( result => result.id == idCarts )
        const producto = carrito.productos.find(result => result.id == idproduct)
        const productIndex = carrito.productos.findIndex(result => result.id == idproduct)

        if(!carrito){
            return false
        }

        if(!producto){
            return false
        }
        carrito.productos.splice(productIndex,productIndex)

        return await this.saveElementID(carrito,carritoIndex)
        }

}

module.exports = ContenedorArchivo