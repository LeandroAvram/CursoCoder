import { Contenedor } from '../service/Contenedor.js'
const fa = new Contenedor('src/resource/carritos.txt')

export const carritoController = {}

carritoController.getCarrito = async (req, res) => {
    const arrayCarritos = await fa.getAll()
    const products = arrayCarritos.find( result => result.id == req.params.id )
    if(products){
        return res.status(200).send(products.productos)
    }else{
        return res.status(400).send({
            error: 'Carrito no encontrado'
        })
    }
}

carritoController.postNewCarrito = async (req, res) => {
    const json = {
        timestamp: new Date,
        productos: []
    }
    const num = await fa.save(json)
    return res.status(200).send({id: num})
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
carritoController.postProductCarrito = async (req, res) => {
    const dato = req.body
    const arrayProduct = await fa.getAll()
    const index = arrayProduct.findIndex( result => result.id == req.params.id )

    if( index > -1){
        arrayProduct[index].productos = dato
        await fa.saveElementID(arrayProduct[index],index)
        return res.status(200).send(arrayProduct[index])
    }
   
    return res.status(400).send({
        error: 'Carrito no encontrado'
    })
}

carritoController.deleteCarrito = async (req, res) => {
    await fa.deleteById(req.params.id)
    const array = await fa.read()
    return res.status(200).send(array)
}

carritoController.deleteProductOfCarrito = async (req, res) => {
    const arrayCarritos = await fa.getAll()
    const carrito = arrayCarritos.find( result => result.id == req.params.id )
    const carritoIndex = arrayCarritos.findIndex( result => result.id == req.params.id )
    const producto = carrito.productos.find(result => result.id == req.params.id_prod)
    const productIndex = carrito.productos.findIndex(result => result.id == req.params.id_prod)

    if(!carrito){
        return res.status(400).send({
            error: 'Carrito no encontrado'
        })
    }

    if(!producto){
        return res.status(400).send({
            error: 'Producto no encontrado'
        })
    }
    carrito.productos.splice(productIndex,productIndex)

    await fa.saveElementID(carrito,carritoIndex)
    return res.status(200).send(carrito)
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