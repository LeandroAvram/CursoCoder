const JWT = require('../util/JWT-Token')

module.exports = async (req, res, next) => {

      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({
          error: 'not authenticated'
        });
      }

      const token = authHeader.split(' ')[1];

      const decodeToken = JWT.verifyToken(token)

      if(decodeToken.error){
        return res.status(401).json({
          error: 'not authenticated'
        });
      }

      if(decodeToken.data.admin==1){
        req.user = decoded.data;
        next()
      }else{
        return res.status(401).json({
          error: 'user not authorized'
        });
      }
}