const DAO = require('../daos')
const fa = DAO.FaCarts

exports.getCarrito = async (req, res) => {
    const arrayCarritos = await fa.getAll()
    const products = arrayCarritos.find( result => result.id == req.params.id )
    if(products){
        if(products.productos){
          return res.status(200).send(products.productos)
        }else{
          return res.status(200).send("Carrito sin producto")
        }
        
    }else{
        return res.status(400).send({
            error: 'Carrito no encontrado'
        })
    }
}

exports.postNewCarrito = async (req, res) => {
    const json = {
        timestamp: new Date,
        productos: []
    }
    const elem = await fa.save(json)
    return res.status(200).send(elem)
}
/**
 * Example body
 * [
        {
          "timestamp": "2021-10-26T23:35:23.081Z",
          "nombre": "adadas",
          "descripcion": "producto lacteo necesita de frio",
          "codigo": "4da68994awe",
          "foto": "www.asdad.asdadsa",
          "precio": "689",
          "stock": "6",
          "id": 1
        },
        {
          "timestamp": "2021-10-26T23:35:23.081Z",
          "nombre": "adadas",
          "descripcion": "producto lacteo necesita de frio",
          "codigo": "4da68994awe",
          "foto": "www.asdad.asdadsa",
          "precio": "689",
          "stock": "6",
          "id": 3
        }
      ] 
 */
exports.postProductCarrito = async (req, res) => {
    const dato = req.body
    const productCarts = await fa.postProductCarts(dato,req.params.id)

    if(productCarts==false){
      return res.status(400).send({error: 'Carrito no encontrado'})
    }else{
      return res.status(200).send(productCarts)
    }
   
}

exports.deleteCarrito = async (req, res) => {
    const array = await fa.deleteById(req.params.id)
    return res.status(200).send(array)
}

exports.deleteProductOfCarrito = async (req, res) => {
    const productCarts = await fa.deleteProductCarts(req.params.id, req.params.id_prod)
    
    if(productCarts==false){
      return res.status(400).send({error: 'Carrito y/o producto no encontrado'})
    }else{
      return res.status(200).send(productCarts)
    }
}


/*
[
  {
    "timestamp": 1635293014614,
    "productos": [
      {
        "timestamp": "2021-10-26T23:35:23.081Z",
        "nombre": "chocolatada",
        "descripcion": "producto lacteo necesita de frio",
        "codigo": "4da68994awe",
        "foto": "www.asdad.asdadsa",
        "precio": "689",
        "stock": "6",
        "id": 1
      },
      {
        "timestamp": "2021-10-26T23:37:51.590Z",
        "nombre": "leche",
        "descripcion": "producto lacteo necesita de frio",
        "codigo": "698qe43asd6ad",
        "foto": "www.asdad.asdadsa",
        "precio": "800",
        "stock": "10",
        "id": 2
      }
    ],
    "id": 1
  },
  {
    "timestamp": 1635293021690,
    "productos": [],
    "id": 2
  },
  {
    "timestamp": 1635294797693,
    "productos": [],
    "id": 4
  }
]
*/


/*
[
  {
    "timestamp": 1635293014614,
    "productos": [
      {
        "timestamp": "2021-10-26T23:35:23.081Z",
        "nombre": "chocolatada",
        "descripcion": "producto lacteo necesita de frio",
        "codigo": "4da68994awe",
        "foto": "www.asdad.asdadsa",
        "precio": "689",
        "stock": "6",
        "id": 1
      },
      {
        "timestamp": "2021-10-26T23:37:51.590Z",
        "nombre": "leche",
        "descripcion": "producto lacteo necesita de frio",
        "codigo": "698qe43asd6ad",
        "foto": "www.asdad.asdadsa",
        "precio": "800",
        "stock": "10",
        "id": 2
      },
      {
        "timestamp": "2021-10-26T23:37:51.590Z",
        "nombre": "leche",
        "descripcion": "producto lacteo necesita de frio",
        "codigo": "698qe43asd6ad",
        "foto": "www.asdad.asdadsa",
        "precio": "800",
        "stock": "10",
        "id": 3
      }
    ],
    "id": 1
  },
  {
    "timestamp": 1635293021690,
    "productos": [],
    "id": 2
  },
  {
    "timestamp": 1635294797693,
    "productos": [],
    "id": 4
  }
]
*/