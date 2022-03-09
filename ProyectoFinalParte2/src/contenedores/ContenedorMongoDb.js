
class ContenedorMongoDb{

    
    constructor(DAO) {
        this.DAO = DAO
    }

    async save(elem) {
        try {
            return await this.DAO.create(elem)
        } catch (error) {
            console.log(`Error en operación de base de datos ${error}`)
            return false
        }
    }

    async getById(number){
         try {
            return await this.DAO.find({_id: number})
        } catch (error) {
            console.log(`Error en operación de base de datos ${error}`)
            return false
        }
    }

    async getAll() {
        try {
            return await this.DAO.find({})
        } catch (error) {
            console.log(`Error en operación de base de datos ${error}`)
            return false
        }
    }

    async deleteById(number) {
        try {
            return await this.DAO.deleteOne({_id: number})
        } catch (error) {
            console.log(`Error en operación de base de datos ${error}`)
            return false
        }
    }

    async deleteAll(){
        try {
            return await this.DAO.deleteMany({})
        } catch (error) {
            console.log(`Error en operación de base de datos ${error}`)
            return false
        }
    }

    async upDate(json,id){
        try {
            return await this.DAO.updateOne({_id: id},{$set: json})
        } catch (error) {
            console.log(`Error en operación de base de datos ${error}`)
            return false
        }
    }

    async postProductCarts(data,id){
        try {
            const dataCarts = await this.DAO.find({_id: id})
            const dataProducts = dataCarts[0].products
            if(data!=[]){
                dataProducts.push(data)
                await this.DAO.updateOne({_id: id},{products: dataProducts})
            }else{
                return false
            }
            console.log(data)
        } catch (error) {
            console.log(`Error en operación de base de datos ${error}`)
            return false
        }
    }

    async deleteProductCarts(idCarts,idProduct){
        try {
            const dataCarts = await this.DAO.find({_id: idCarts})
            let dataProducts = dataCarts[0].products
            
            if(dataCarts!=[]){
                 dataProducts = dataProducts.filter(function (e) {
                return e.code !== idProduct;
                })
                await this.DAO.updateOne({_id: idCarts},{products: dataProducts})
            }else{
                return false
            }
        } catch (error) {
            console.log(`Error en operación de base de datos ${error}`)
            return false
        }
    }

}

module.exports = ContenedorMongoDb