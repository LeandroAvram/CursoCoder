const express = require('express')
const exphbs = require('express-handlebars')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const contenedorSQL = require('../db/ContenedorSQL')
const { optionsDatabaseMariaDb, optionsDatabaseSqlite3 } = require( '../db/configdb' )

const productContainer = new contenedorSQL( 
  optionsDatabaseMariaDb, {
    tableName: 'productos',
    searchId: 'id',
    tableColumns: {
      title: 'string',
      price: 'float',
      thumbnail: 'string',
      id: 'primary'
    }
  } 
)

const chatContainer = new contenedorSQL( 
  optionsDatabaseSqlite3, {
    tableName: 'chat',
    searchId: 'id',
    tableColumns: {
        mail: 'string',
        mensaje: 'string',
        fecha: 'timestamp',
        id: 'primary'
    }
  }
)

const app = express()
app.use(express.json())
app.use('/', express.static('public'))
app.use(express.urlencoded({ extended: true }))

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

io.on('connection', async socket => {
  console.log('Nuevo cliente conectado')

  socket.emit('actualizarProductos', await productContainer.getAll())
  socket.emit('actualizarMensajes', await chatContainer.getAll())


  socket.on('nuevoProducto', async producto => {
      await productContainer.save(producto)
      io.sockets.emit('actualizarProductos', await productContainer.getAll())
  })

  socket.on('nuevoMensaje', async mensaje => {
    await chatContainer.save(mensaje)
    io.sockets.emit('actualizarMensajes', await chatContainer.getAll())
})
})

app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'index.hbs'
  }))

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('main',{})
  })

app.get('/product', async (req, res) => {
    const array = await productContainer.read()
    if(array.length!=0){
      dataexits = true
    }else{
      dataexits = false
    }
    res.render('product',{array,dataexits})
})



/* Server Listen */
const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))