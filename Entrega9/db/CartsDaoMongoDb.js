const ContenedorMongoDb = require('./ContenedorMongoDb')
const Chat = require('../models/chat.model')
const mongoose = require('mongoose')

class ChatsDaoMongoDb extends ContenedorMongoDb {
    
    constructor(){
        mongoose.connect('mongodb://localhost/test', {
            serverSelectionTimeoutMS: 5000,
            }).then(()=>{console.log('Base de datos conectada')})
        super(Chat)
    }

    async disconnect(){
    }
}

module.exports = ChatsDaoMongoDb