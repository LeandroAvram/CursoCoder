const mongoose = require('mongoose')
const admin = require('firebase-admin')
const serviceAccount = require('../config/coderhouse-c68fd-firebase-adminsdk-2kd96-320b456cff.json');

const ProductsDaoArchivo = require('./products/productsDaoArchivo')
const ProductsDaoMongoDb = require('./products/productsDaoMongoDb')
const ProductsDaoFirebase = require('./products/productsDaoFirebase')

const CartsDaoArchivo = require('./carts/CartsDaoArchivo')
const CartsDaoMongoDb = require('./carts/CartsDaoMongoDb')
const CartsDaoFirebase = require('./carts/CartsDaoFirebase')

const timpoalamacenamiento = 'firebase'

switch (timpoalamacenamiento) {
  case 'mongodb':
    console.log("mongodb")
     mongoose.connect('mongodb://localhost/test', {
            serverSelectionTimeoutMS: 5000,
            }).then(()=>{console.log('Base de datos conectada')})
    faCarts = new CartsDaoMongoDb()
    faProducts = new ProductsDaoMongoDb()
    break
  case 'archivo':
    console.log("archivo")
    faCarts = new CartsDaoArchivo()
    faProducts = new ProductsDaoArchivo()
    break
   case 'firebase':
    console.log("firebase")
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    const db = admin.firestore();
    faCarts = new CartsDaoFirebase(db)
    faProducts = new ProductsDaoFirebase(db)
    break  
}

module.exports = {
    FaCarts: faCarts,
    FaProducts: faProducts
}