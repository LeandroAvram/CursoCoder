const multer  = require('multer')
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      const data = file.originalname.split(".")
      const name = uuidv4()
      cb(null, name+"."+data[1])
    }
  })
  
const upload = multer({ storage })
module.exports = upload