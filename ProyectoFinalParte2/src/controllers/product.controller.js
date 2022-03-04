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
  const { name, description, categoria, code, phot, price, stock } = req.body
  
    const json = {
        name: name,
        description: description,
        categoria: categoria,
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
    "name": "Naranja",
    "description": "Producto de verduleria de buena calidad",
    "categoria": "verduleria",
    "code": "76231256",
    "phot": "xxxxxxxxxxxxxxxx",
    "price": "530",
    "stock": "6"
}
*/