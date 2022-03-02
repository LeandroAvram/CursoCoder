const { normalize, denormalize, schema } = require("normalizr");
const util = require('util')

const print = (objeto) => {
  console.log(util.inspect(objeto, false, 12, true))
}
// Definimos un esquema de usuarios
const author = new schema.Entity('author')

// Definimos un esquema de mensajes
const mensaje = new schema.Entity('mensajes',{
    author: author
  })

// Definimos un esquema de sala de chat
const chat = new schema.Entity('chats', {
  mensajes: [ mensaje ]
});
exports.normalizeObject = async(mensajes) =>{
    const msjNormalize = {
        id: "chat",
        mensajes: mensajes
    }
    //console.log(' ------------- OBJETO ORIGINAL --------------- ')
    //print(msjNormalize)
    //console.log('ORIGINAL OBJ LENGTH',JSON.stringify(msjNormalize).length)

  
    //onsole.log(' ------------- OBJETO NORMALIZADO --------------- ')
    const normalizedData = normalize(msjNormalize, chat);
    //print(normalizedData)
    //console.log('NORMALIZERDATA LENGTH',JSON.stringify(normalizedData).length)
    const totalCompresion = 100 - ((JSON.stringify(normalizedData).length * 100) / JSON.stringify(msjNormalize).length )

    const roundTotalCompresion = Math.round(totalCompresion * 100) / 100
    //console.log('PORCENTAJE DE COMPRESION', roundTotalCompresion)
return { normalizedData, roundTotalCompresion }
}