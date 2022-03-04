const passport = require('passport');
const mail = require('./sendmail')
const { Strategy: LocalStrategy } = require('passport-local');
const bCrypt = require('bcrypt');
const DAO = require('../daos')
const fa = DAO.FaLogin

passport.use('register', new LocalStrategy({
    passReqToCallback: true
  },async (req, username, password, done) => {
    
    const { name,direccion,edad,numline,password2,foto  } = req.body

    console.log(req.body)
    
    if(password!=password2){
      return done('password validation error')
    }

    const usuario = await fa.getUser(username)

    if (usuario[0]) {
      return done('already registered')
    }
    
    const user = {
      username,
      password: createHash(password),
      name,
      direccion,
      edad,
      numline,
      foto
    }

    const mailOptions = {
      from: 'Servidor Node.js Laurianne Klocko',
      to: "laurianne.klocko90@ethereal.email",
      subject: 'Nuevo Registro',
      html: JSON.stringify(user)
    }

    mail(mailOptions)

    await fa.save(user)
  
    return done(null, user)
  }));
  
  passport.use('login', new LocalStrategy(async (username, password, done) => {
    const user = await fa.getUser(username)
    
    if (!user[0]) {
      return done(null, false)
    }
  
    if (!isValidPassword(user[0], password)) {
      console.log('Invalid Password');
      return done(null, false);
    }
  
    return done(null, user[0]);
  }));
  
  passport.serializeUser(function (user, done) {
    done(null, user.username);
  });
  
  passport.deserializeUser(async function (username, done) {
    const usuario = await fa.getUser(username)
    done(null, usuario);
  });

  function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
  }
  
  function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }

  module.exports = passport