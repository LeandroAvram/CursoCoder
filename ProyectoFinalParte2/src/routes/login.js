const express = require('express')
const router = express.Router()
const passport = require('../service/passport')
const upload  = require('../service/multerFile')


// REGISTER
router.get('/register', (req, res) => {res.sendFile(process.cwd() + '/public/register.html')})
router.post('/register', passport.authenticate('register', { failureRedirect: '/api/login/failregister', successRedirect: '/front/productos' }))
router.get('/failregister', (req, res) => {res.render('register-error')})
  
router.post('/uploadimage', upload.single('file'), (req, res) => {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    console.log('file received');
    return res.send({
      nombre: req.file.filename
    })
  }
});

// LOGIN
router.get('/login', (req, res) => {res.sendFile(process.cwd() + '/public/login.html')})
router.post('/login', passport.authenticate('login', { failureRedirect: '/api/login/faillogin', successRedirect: '/front/productos' }))
router.get('/faillogin', (req, res) => {res.render('login-error')})

router.get('/logout',(req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.json({ error: 'olvidar', body: err })
    } else {
      res.send('usuario deslogeado')
    }
  })
})

module.exports = router