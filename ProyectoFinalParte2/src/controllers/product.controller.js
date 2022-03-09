const DAO = require('../daos')
const fa = DAO.FaProducts

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
  const { name, description, code, phot, price, stock } = req.body
  
    const json = {
        name: name,
        description: description,
        code: code,
        phot: phot,
        stock: stock,
        price: price,
        timestamp: new Date
    }
    const elem = await fa.save(json)
    return res.status(200).send(elem)
}

exports.putProduct = async (req, res) => {
  const update = await fa.upDate(req.body,req.params.id)
  
  if(update==false){
      return res.status(400).send({
            error: 'Producto no encontrado'
        })
  }else{
    return res.status(200).send(update)
  }
  
}

exports.deleteProduct = async (req, res) => {
  const { id } = req.params
  if(!id){
    return res.status(400).send("mal request")
  }
  await fa.deleteById(id)
  const array = await fa.getAll()
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