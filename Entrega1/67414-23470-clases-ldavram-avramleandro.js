class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName(){
        return  `Nombre del usuario: ${this.nombre} ${this.apellido}`
    }

    addMascota(mascota){
        this.mascotas.push(mascota)
    }

    countMascotas(){
        return this.mascotas.length
    }

    addBook(nombre, autor){
        let objectBock = {
            nombre: nombre,
            autor: autor
        }
        this.libros.push(objectBock)
    }

    getBookNames() {
        return this.libros.map((e)=>e.nombre)
    }
}

const U = new Usuario("Leando", "Avram", [{nombre:'El señor de las moscas',autor:'yomiad'},{nombre:'hasdasd',autor:'adsddd'}], ['mascota1','mascota2','mascota3'])

//Retorna el nombre completo
console.log(U.getFullName());

//Agrega una mascota mas al usuario
U.addMascota("hanna")

U.addMascota("hanna2")

//Cuenta la cantidad de mascotas que tiene el usuario
console.log(U.countMascotas());

//Agrega un libro mas al usuario 
U.addBook("EndGame","Maxa")

//Retorna el nombre de los libros que tiene el usuario
console.log(U.getBookNames());

//Devuelve el objeto Usuario completo
console.log(U);
