const socket = io();

async function saveImage(e) {
    const file = document.getElementById("file");
    const foto = document.getElementById("foto");
    const formData = new FormData();
    formData.append("file", file.files[0]);
    const res = await getdata(formData)
    const texto = await res.text()
    const data = JSON.parse(texto)
    foto.value = data.nombre
}

async function getdata(formData){
    return fetch("/api/login/uploadimage", {
        method: 'post',
        body: formData
    })
}

function logout(){
    window.location.href = '/api/login/login';
}

function addCart(e,index){
    let CantidadProducto

    const cantidad = document.getElementById("cantElemnt"+index);
    if(!cantidad.value){
        CantidadProducto = 1
    }else{
        CantidadProducto = cantidad.value
    }

    const token = (window.location.search).split("=")[1]

    const dataSend = {
        idProduct:e,
        cant: CantidadProducto
    }

    fetch("/front/carritos", {
        method: 'post',
        headers: new Headers({
            'Authorization': 'Basic '+token,
            'Content-Type': 'application/json'
        }), 
        body: JSON.stringify( dataSend )
    })

    document.getElementById("cantElemnt"+index).value = null
}

function deleteProductCart(e,index){
    let CantidadProducto

    const cantidad = document.getElementById("cantElemnt"+index);
    if(!cantidad.value){
        CantidadProducto = 1
    }else{
        CantidadProducto = cantidad.value
    }

    const token = (window.location.search).split("=")[1]

    const dataSend = {
        idProduct:e,
        cant: CantidadProducto
    }

    fetch("/front/carritos", {
        method: 'delete',
        headers: new Headers({
            'Authorization': 'Basic '+token,
            'Content-Type': 'application/json'
        }), 
        body: JSON.stringify( dataSend )
    }).then(()=>{location.reload();})

    document.getElementById("cantElemnt"+index).value = null
}

function confirmarCompra(){

    const dire = document.getElementById("dire");

    const token = (window.location.search).split("=")[1]

    const dataSend = {
        direccion:dire.value
    }

    fetch("/front/order", {
        method: 'post',
        headers: new Headers({
            'Authorization': 'Basic '+token,
            'Content-Type': 'application/json'
        }), 
        body: JSON.stringify( dataSend )
    }).then(()=>{location.reload();})

}
async function cargarMensajes(mensajes) {
    const plantilla = await obtenerPlantillaMensajes()
    const render = Handlebars.compile(plantilla);
    const html = render({mensajes})
    document.getElementById('mensajes').innerHTML = html
    const scrollHeight = document.getElementById("mensajes").scrollHeight
    document.getElementById("mensajes").scrollTop = scrollHeight
}

Handlebars.registerHelper('formatDate', function(date) {
    return new Handlebars.SafeString(
        new Date(date).toLocaleString()
    );
});

function obtenerPlantillaMensajes() {
    return fetch('/plantillas/listaMensajes.hbs')
        .then(respuesta => respuesta.text())
}

socket.on('actualizarMensajes', mensajes => {
    cargarMensajes(mensajes)
});


function agregarMensaje(form) {

    const token = (window.location.search).split("=")[1]

    const payloda = parseJwt(token)

    const mensaje = {
        username: payloda.data.username,
        mensaje: form["mensaje"].value
    }

    socket.emit('nuevoMensaje', mensaje);
    form["mensaje"].value=""
    return false;
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

/*
  <!--{{[<span style="color:brown">{{formatDate fecha "dddd DD.MM.YYYY HH:mm"}}</span>]: }}-->
                
*/