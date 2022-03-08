const express = require('express')
const router = express.Router()
const frontController = require('../controllers/front.controller')
const userController = require('../controllers/user.controller')
const upload  = require('../util/multerFile')



// REGISTER
router.get('/register', frontController.getRegisterPage)
router.post('/uploadimage', upload.single('file'), userController.updateImageUser);
router.post('/register', userController.registerUser)
router.post('/registerFron', userController.registerUserFront)


// LOGIN
router.get('/login', frontController.getLoginPage)
router.post('/login', userController.loginUser)
router.post('/loginFront', userController.loginUserFront)


module.exports = router