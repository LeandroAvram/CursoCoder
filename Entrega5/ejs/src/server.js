const express = require('express')
const configRoutes = require('./router/routes')
const FileArray = require('./Contenedor')

const fa = new FileArray('./productos.txt')

const app = express()
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('productform',{})
  })

app.get('/product', async (req, res) => {
    const array = await fa.read()
    if(array.length!=0){
      dataexits = true
    }else{
      dataexits = false
    }
    res.render('product',{array,dataexits})
})

configRoutes(app)


/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))