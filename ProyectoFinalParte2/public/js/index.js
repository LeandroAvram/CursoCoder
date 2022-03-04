
console.log("esta ejecutandose")

async function saveImage(e) {
    const file = document.getElementById("file");
    const foto = document.getElementById("foto");
    console.log(file.files)
    const formData = new FormData();
    formData.append("file", file.files[0]);
    const res = await getdata(formData)
    const texto = await res.text()
    const data = JSON.parse(texto)
    foto.value = data.nombre
    console.log(data)
}

async function getdata(formData){
    return fetch("http://localhost:8080/api/login/uploadimage", {
        method: 'post',
        body: formData
    })
}

function logout(){
    fetch(`/api/login/logout`)
    window.location.href = 'http://localhost:8080/';
}

function addCart(e,index){
    let CantidadProducto
    const cantidad = document.getElementById("cantElemnt"+index);
    if(!cantidad.value){
        CantidadProducto = 1
    }else{
        CantidadProducto = cantidad.value
    }
    console.log(e)
}