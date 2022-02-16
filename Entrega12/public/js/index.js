const socket = io();
const author = new normalizr.schema.Entity('author')

const mensaje =new normalizr.schema.Entity('mensajes',{
    author: author
  })
const chat = new normalizr.schema.Entity('chats', {
    mensajes: [ mensaje ]
  })

async function cargarProductos(productos) {
    const plantilla = await obtenerPlantillaProductos()
    const render = Handlebars.compile(plantilla);
    const html = render({ productos })
    document.getElementById('productos').innerHTML = html
}

function obtenerPlantillaProductos() {
    return fetch('/plantillas/listaProductos.hbs')
        .then(respuesta => respuesta.text())
}


socket.on('actualizarProductos', productos => {
    cargarProductos(productos)
});

function agregarProducto(form) {
    const producto = {
        title: form["title"].value,
        price: form["price"].value,
        thumbnail: form["thumbnail"].value,
    }
    socket.emit('nuevoProducto', producto);
    form.reset();
    return false;
}

function login(form) {
    const name = form["name"].value
    console.log(name)
    fetch(`/loginsend?name=${name}`)
    form.reset();
    window.location.href = 'http://localhost:8080';
    return false;
}

function logout(){
    fetch(`/logout`)
    window.location.href = 'http://localhost:8080/login';
}

//*********************test */
async function cargarProductosTest(productos) {
    const plantilla = await obtenerPlantillaProductos()
    const render = Handlebars.compile(plantilla);
    const html = render({ productos })
    document.getElementById('productos-test').innerHTML = html
}

function obtenerPlantillaProductos() {
    return fetch('/plantillas/listaProductos.hbs')
        .then(respuesta => respuesta.text())
}

getdata()

function getdata(){
    const data = fetch('/api/productos-test')
    .then(respuesta => respuesta.json())

    data.then(e => cargarProductosTest(e))
}
//*********************test */

Handlebars.registerHelper('formatDate', function(date) {
    return new Handlebars.SafeString(
        new Date(date).toLocaleString()
    );
});

async function cargarMensajes(mensajes) {
    const plantilla = await obtenerPlantillaMensajes()
    const render = Handlebars.compile(plantilla);
    const html = render({ mensajes })
    document.getElementById('mensajes').innerHTML = html
    const scrollHeight = document.getElementById("mensajes").scrollHeight
    document.getElementById("mensajes").scrollTop = scrollHeight
}

function obtenerPlantillaMensajes() {
    return fetch('/plantillas/listaMensajes.hbs')
        .then(respuesta => respuesta.text())
}


socket.on('actualizarMensajes', Mensajes => {
    const {normalizedData, roundTotalCompresion} = Mensajes
    const denormalizedData = normalizr.denormalize(normalizedData.result, chat, normalizedData.entities);
    denormalizedData.porcentaje = roundTotalCompresion
    console.log(denormalizedData)
    cargarMensajes(denormalizedData)
});


function agregarMensaje(form) {
    const mensaje = {
        author: {
            id: form["mail"].value, 
            nombre: form["nombre"].value, 
            apellido: form["apellido"].value, 
            edad: form["edad"].value, 
            alias: form["alias"].value,
            avatar: form["avatar"].value
        },
        mensaje: form["mensaje"].value
        }
    socket.emit('nuevoMensaje', mensaje);
    form["mensaje"].value=""
    return false;
}