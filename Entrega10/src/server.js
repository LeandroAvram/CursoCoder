const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const faker = require('faker')
const normalizeChat = require('./util/normalizeObject')
const util = require('util')

/* ------------------------------------------------*/
/*           Persistencia por MongoDB              */
/* ------------------------------------------------*/
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
/* ------------------------------------------------*/

const ProductTest = ['chocolate','leche','mani','manzana','sandia','pilas','aceite','ruedas']
const price = ['50','68','12','5','90','64','77','23']
const thumbnail = ['https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png','https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_instagram-128.png']

const contenedorSQL = require('../db/ContenedorSQL')
const ContenedorArchivo = require('../db/ContenedorArchivo')
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

const chatContainer = new ContenedorArchivo('src/resource/chats.txt')

const app = express()

app.use(session({
  store: MongoStore.create({
      //En Atlas connect App :  Make sure to change the node version to 2.2.12:
      mongoUrl: '*********************************',
      mongoOptions: advancedOptions
  }),
  /* ----------------------------------------------------- */

  secret: 'secreto312415323',
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 60000
  } 
}))

app.use(express.json())
app.use('/', express.static('public'))
app.use(express.urlencoded({ extended: true }))

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

io.on('connection', async socket => {
  console.log('Nuevo cliente conectado')

  socket.emit('actualizarProductos', await productContainer.getAll())
  socket.emit('actualizarMensajes', await CompressMensajes())


  socket.on('nuevoProducto', async producto => {
      await productContainer.save(producto)
      io.sockets.emit('actualizarProductos', await productContainer.getAll())
  })

  socket.on('nuevoMensaje', async mensaje => {
    mensaje.fecha = new Date()
    console.log(mensaje)
    await chatContainer.save(mensaje)
    io.sockets.emit('actualizarMensajes', await CompressMensajes())
})
})

async function CompressMensajes(){
  const data = await chatContainer.getAll()
  const normalizedEmpresa = await normalizeChat.normalizeObject(data);
  return normalizedEmpresa
}

function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true))
}

app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'index.hbs'
  }))

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  if(req.session.name){
    let dataname = req.session.name
    res.render('main',{dataname})
  }else{
    res.redirect('/login')
  }
})

app.get('/login', (req, res) => {
  res.render('login',{})
})

app.get('/test', (req, res) => {
  res.render('main-test',{})
})

app.get('/loginsend',(req, res) => {
  req.session.name = req.query.name
  console.log(req.query.name)
  console.log(req.session.name)
  res.redirect('/')
})

app.get('/logout',(req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.json({ error: 'olvidar', body: err })
    } else {
      res.send('usuario deslogeado')
    }
  })
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

app.get('/api/productos-test', async (req, res) => {
  dataexits = true
  const productosArray = []
  for (let i = 0; i < 5; i++) {
  let product = {
    title: `${faker.random.arrayElement(ProductTest)}`,
    price: `${faker.random.arrayElement(price)}`,
    thumbnail: `${faker.random.arrayElement(thumbnail)}`,
    id: i
  }
  productosArray.push(product)
}
res.send(productosArray)
})

/* Server Listen */
const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))