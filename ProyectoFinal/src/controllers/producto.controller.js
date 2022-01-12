const FileArray = require('../service/Contenedor')
const fa = new FileArray('src/resource/productos.txt')

exports.getProduct = async (req, res) => {
  const id = req.params.id
  if(!req.params.id){
    let data = await fa.getAll()
    return res.status(200).send(data)
  }else{
    let data = await fa.getById(id)
    return res.status(200).send(data)
  }
}

exports.postProduct = async (req, res) => {
  const { nombre, descripcion, codigo, foto, precio, stock } = req.body
    const json = {
        timestamp: new Date,
        nombre: nombre,
        descripcion: descripcion,
        codigo: codigo,
        foto: foto,
        precio: precio,
        stock: stock
    }
    const num = await fa.save(json)
    const array = await fa.getById(num)
    return res.status(200).send(array)
}

exports.putProduct = async (req, res) => {
  const { nombre, descripcion, codigo, foto, precio, stock } = req.body
  const arrayProduct = await fa.getAll()
  const index = arrayProduct.findIndex( result => result.id == req.params.id )

  if( index > -1){
      arrayProduct[index].timestamp = new Date
      arrayProduct[index].nombre = nombre
      arrayProduct[index].descripcion = descripcion
      arrayProduct[index].codigo = codigo
      arrayProduct[index].foto = foto
      arrayProduct[index].precio = precio
      arrayProduct[index].stock = stock
      await fa.saveElementID(arrayProduct[index],index)
      return res.status(200).send(arrayProduct[index])
  }
 
  return res.status(400).send({
      error: 'Producto no encontrado'
  })
}

exports.deleteProduct = async (req, res) => {
  const id = req.params.id
  await fa.deleteById(id)
  const array = await fa.read()
  return res.status(200).send(array)
}

/*
{
    "nombre": "chocolatada",
    "descripcion": "producto lacteo necesita de frio",
    "codigo": "4da68994awe",
    "foto": "www.asdad.asdadsa",
    "precio": "689",
    "stock": "6"
}
*/

/*
[
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
    "timestamp": "2021-10-26T23:39:14.607Z",
    "nombre": "azucar",
    "descripcion": "producto que sirve para endulzar",
    "codigo": "9813d7gh493",
    "foto": "www.asdad.asdadsa",
    "precio": "236",
    "stock": "50",
    "id": 3
  }
]
*/