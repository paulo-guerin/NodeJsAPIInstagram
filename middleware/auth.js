const jwt = require('jsonwebtoken');

module.exports = () => {
  return  (req, res, next) => {
      if(req.headers.authorization){
      const token = req.headers.authorization.split(" ")[1]
      try {
        if(jwt.verify(token, process.env.SECRET_PHRASE)){
          next();
        }
        else {
          res.status(401).json({ message: "Authentication KO - failed"});
        }
      } catch (error) {
        res.status(401).json({ message: "Authentication KO - failed"});
      }
    }
    else{
      res.status(401).json({ message: "Authentication KO - failed"});
    }
  }
}