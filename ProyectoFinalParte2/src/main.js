const path = require('path')
require('dotenv').config({
  path:
      process.env.NODE_ENV == 'PROD'
          ? path.resolve(process.cwd()+'/src/config/produccion.env')
          : path.resolve(process.cwd()+'/src/config/local.env')
})
const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('../src/routes')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const chatService = require('./service/chat.service')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use('/', express.static('public'))
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'index.hbs'
  }))
app.set('view engine', 'hbs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', routes)

io.on('connection', async socket => {
  socket.emit('actualizarMensajes', await chatService.getChat())

  socket.on('nuevoMensaje', async (mensaje) => {
    mensaje.timestamp = new Date()
    await chatService.saveChat(mensaje)
    io.sockets.emit('actualizarMensajes', await chatService.getChat())
  })
})

const PORT = process.env.PORT
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))