import express from 'express'
import routes from '../src/routes/index.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)

const PORT = process.env.PORT | 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))