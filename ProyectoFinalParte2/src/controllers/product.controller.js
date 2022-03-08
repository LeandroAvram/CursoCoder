const productService = require('../service/product.service')

exports.getProduct = async (req, res) => {
  const id = req.params.id
  if(!req.params.id){
    return res.status(200).send(await productService.getProducts())
  }else{
    return res.status(200).send(await productService.getProduct(id))
  }
}

exports.postProduct = async (req, res) => {

  const { name, description, code, photo, price, stock } = req.body

  if(!name||!description||!code||!photo||!price||!stock){
    return res.status(400).send({error:"Los parametros del producto enviados son incorrectos"})
  }

    const jsonProduct = {name,description,code,photo,stock,price}

    return res.status(200).send(await productService.saveProduct(jsonProduct))
}

exports.putProduct = async (req, res) => {
  const { id } = req.params
  const { name, description, code, photo, price, stock } = req.body

  if(!name||!description||!code||!photo||!price||!stock||!id){
    return res.status(400).send({error:"Los parametros del producto enviados son incorrectos"})
  }

  const jsonProduct = {name,description,code,photo,stock,price}

  const update = await productService.updateProduct(jsonProduct,id)
  
  if(update==false){
      return res.status(404).send({
            error: 'Producto no encontrado'
        })
  }else{
    return res.status(200).send({mensage:"Producto modificado correctamente"})
  }
}

exports.deleteProduct = async (req, res) => {
  const { id } = req.params

  if(!id){
    return res.status(400).send({error:"Los parametros del producto enviados son incorrectos"})
  }

  await productService.deleteProduct(id)
  return res.status(200).send(await productService.getProducts())
}
