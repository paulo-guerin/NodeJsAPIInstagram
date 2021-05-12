const User = require('../models').User;
const Post = require('../models').Post;
const Hashtag = require('../models').Hashtag;
const jwt = require('jsonwebtoken');

exports.post_add = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const post =  req.body;
  post.userId = jwt.decode(token).id;
  post.img = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

  var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
  var matches = [];
  var match;
  
  while ((match = regex.exec(post.description))) {
    matches.push(match[1]);
  }

  try {
    Post.create(post, {include:['hashtags'] })
    .then(newPost => {
      matches.forEach(hashtag => {
        Hashtag.findOne({where : {name: hashtag}})
        .then(foundedHashtag => {
          if(foundedHashtag == null){
            Hashtag.create({
              name: hashtag
            })
            .then(newHashtag => {
              newPost.setHashtags([newHashtag])
            })
          } else {
            newPost.setHashtags([foundedHashtag])
          }
        })
      });
      res.status(201).json({
        newPost
      })
    })
    .catch( err => console.log(err))
  } catch (error) {
    res.status(401).json({ message: "Authentication KO - failed"});
  }
}

exports.post_list = (req, res, next) => {
    Post.findAll({
      include:['hashtags'],
      attributes: ['id', 'description', 'img']
    })
    .then( Posts => res.status(200).json(Posts))
    .catch(err => console.log(err))
}

exports.post_detail = (req, res, next) =>{
  const id = req.params.id;
  Post.findByPk(id, {
    attributes: ['id', 'description'],
    include: [
      {
        model: Hashtag,
        as: 'hashtags',
        attributes: ['name']
      },
      {
        model: User,
        as: 'author',
        attributes: ['login']
      }
    ]
  })
  .then(post => res.status(200).json(post))
  .catch(err => console.log(err))
}

exports.post_edit = (req, res, next) =>{
  const id = req.params.id;
  const post =  req.body;
  if(req.file){
    post.img = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }

  Post.update(post, {
    where: {
        id: id
      }
    })
    .then(() => {
    res.status(200).json({message: 'post updated'})
  })
  .catch(err => console.log(err))
}

exports.post_delete = (req, res, next) =>{
  const id = req.params.id;
  Post.destroy({
    where: {
      id: id
    }
  })
  .then(post => res.status(200).json({message: 'post deleted'}))
  .catch(err => console.log(err))
}