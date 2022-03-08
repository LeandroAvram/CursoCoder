const JWT = require('../util/JWT-Token')

module.exports = async (req, res, next) => {

    let token 

    if(req.query.id){
        token = req.query.id
        if (!token) {
            return res.redirect('/api/login/login');
        }
    }else{
        authHeader = req.headers.authorization
        if (!authHeader) {
            return res.redirect('/api/login/login');
        }
        token = authHeader.split(' ')[1];
    }

    const decodeToken = JWT.verifyToken(token)

    if(decodeToken.error){
        return res.redirect('/api/login/login');
      }

    req.user = decodeToken.data;
    req.userToken = token
    next()
}