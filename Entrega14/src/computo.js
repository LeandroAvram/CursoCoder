const calculo = (cant) => {
    let numeros = []
    let arraycount = []
    for (let i = 0; i < cant; i++) {
        numeros.push(Math.floor((Math.random() * (1000-1)) +1))
    }
    numeros.forEach(x => {
        arraycount.find(e=> {
            if(e.num == x){
                e.count++
            }
        })
        arraycount.push({num: x, count:1})
    })
    return arraycount
}

process.on('exit', () => {
    console.log(`worker #${process.pid} cerrado`)
})

process.on('message', cant => {
    console.log(`worker #${process.pid} iniciando su tarea`)
    const sum = calculo(cant)
    process.send(sum)
    console.log(`worker #${process.pid} finalizó su trabajo`)
    process.exit()
})
