const jwt = require('jsonwebtoken');
const User = require('../models').User;
const Post = require('../models').Post;

module.exports = () => {
  return  (req, res, next) => {
    Post.findByPk(req.params.id)
    .then(post => {
      if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1]
        try {
          User.findByPk(post.userId)
          .then(user=>{
            if(jwt.decode(token).id == user.id && jwt.decode(token).login == user.login){
              next();
            }
            else {
              res.status(401).json({ message: "Vous ne pouvez pas modifier les informations d'un post d'un autre utilisateur"});
            }
          })
          .catch(error => {
            res.status(401).json({ message: "Cet utilisateur n'éxiste pas"});
          })
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