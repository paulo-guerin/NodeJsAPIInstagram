const User = require('../models').User;
const Post = require('../models').Post;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.user_add = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) =>{
    if(err){
      throw err
    }
    let user = req.body;
    user.password = hash;
    User.create(user)
    .then( data => res.status(201).json({
      login: data.login,
      email: data.email,
      birthdate: data.birthdate
    }))
    .catch( err => console.log(err))
    }
  )
}

exports.user_login = (req, res, next) => {
  User.findOne({
    where: {
      login: req.body.login
    }
  })
  .then(user => {
    if(user){
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if(err) return res.status(500).json(err)
        else {
          if(result) {
            const token = jwt.sign({ login: user.login, id: user.id}, process.env.SECRET_PHRASE, { expiresIn: '365d'})
            res.status(200).json({
              token: token
            })
          }
          else return res.json({ message: 'You fail' })
        }
      })
    }
    else {
      res.status(404).json({ message: 'Bad login / password'})
    }
  })
  .catch(error => {
    res.status(500).json(error);
  })
}

exports.user_list = (req, res, next) => {
    User.findAll({
      attributes: ['id', 'email', 'birthdate', 'login'],
      include: ['posts']
    })
    .then( Users => res.status(200).json(Users))
    .catch(err => console.log(err))
}

exports.user_detail = (req, res, next) =>{
  const id = req.params.id;
  User.findByPk(id, {
    attributes: ['id', 'email', 'birthdate', 'login'],
    include: [
      {
        model: Post,
        as: 'posts',
        attributes: ['id','description', 'userId', 'img']
      }
    ]
  })
  .then(user => res.status(200).json(user))
  .catch(err => console.log(err))
}

exports.user_edit = (req, res, next) =>{
  const id = req.params.id;
  let user = req.body;
  if(user.password){
    bcrypt.hash(user.password, 10, (err, hash) =>{
      if(err){
        throw err
      }
      user.password = hash;
      User.update(user, {
      where: {
          id: id
      }
      })
      .then(() => {
      res.status(200).json({message: 'user updated'})
      })
      .catch(err => console.log(err))
    })
  } else {
    User.update(user, {
      where: {
          id: id
        }
      })
      .then(() => {
      res.status(200).json({message: 'user updated'})
    })
    .catch(err => console.log(err))
  }
}

exports.user_delete = (req, res, next) =>{
  const id = req.params.id;
  User.destroy({
    where: {
      id: id
    }
  })
  .then(user => res.status(200).json({message: 'user deleted'}))
  .catch(err => console.log(err))
}