const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('../src/routes')
const session = require('express-session')
const passport = require('passport')

const app = express()
app.use('/', express.static('public'))
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'index.hbs'
  }))

app.set('view engine', 'hbs');

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 750000
    }
  }))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)

const PORT = process.env.PORT | 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))