const jwt = require('jsonwebtoken');
const User = require('../models').User;

module.exports = () => {
  return  (req, res, next) => {
    User.findByPk(req.params.id)
    .then(user => {
      if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1]
        try {
          if(jwt.decode(token).id == req.params.id && jwt.decode(token).login == user.login){
            next();
          }
          else {
            res.status(401).json({ message: "Vous ne pouvez pas modifier les informations d'un autre utilisateur"});
          }
        } catch (error) {
          res.status(401).json({ message: "Authentication KO - failed"});
        }
      }
      else{
        res.status(401).json({ message: "Authentication KO - failed"});
      }
    })
    .catch(error => {
      res.status(500).json({ message: "No user founded"});
    })
  }
}