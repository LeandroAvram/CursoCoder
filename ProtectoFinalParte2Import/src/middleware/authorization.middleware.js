export const authResolver = async (req, res, next) => {
  const auth = true;
  if(auth){
      next()
  }else{
    return res.status(401).send({
        error: -1,
        descripcion: "ruta no autorizada"
      })
    }
}