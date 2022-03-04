module.exports = async (req, res, next) => {
    if (req.isAuthenticated()) {
      next()
    } else {
      next()
      /*
      return res.status(401).send({
        error: -1,
        descripcion: "ruta no autorizada"
      })
      */
    }
}