const User = require('../models').User;
const Post = require('../models').Post;
const Hashtag = require('../models').Hashtag;
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');

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

exports.post_search = (req, res, next) =>{
  let hashtags = [];
  let locations = [];
  let dates = [];
  let datesFormat = [];
  const Op = Sequelize.Op;

  let options = { 
    include : [
      {
        model: Hashtag,
        as : 'hashtags'
      }
    ]
  };

  if(req.body.hashtags){
    hashtags = req.body.hashtags.split(' ');
    options.include[0].where = {
      name: {[Op.in]: hashtags}
    }
  }

  if(req.body.locations){
    locations = req.body.locations.split(' ');
    if(!options.where){
      options.where = {};
    }
    options.where.location = {[Op.in]: locations};
  }

  if(req.body.dates){
    dates = req.body.dates.split(' ');
    dates.forEach(date => datesFormat.push(new Date(date)));
    if(!options.where){
      options.where = {};
    }
    options.where.createdAt = {[Op.between]: datesFormat};
  }

  console.log(options);

  Post.findAll(options)
  .then(post => res.status(200).json(post))
  .catch(err => console.log(err))

}

exports.post_user_thread = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  let options = { 
    include : [
      {
        model: Hashtag,
        as : 'hashtags'
      }
    ]
  };

  User.findByPk(jwt.decode(token).id, {
    include: [
      {
        model: User,
        as: 'followedUsers',
      }
    ]
  })
  .then(user => {
    user.getFollowedUsers(
      {
        include: [
          {
            model: Post,
            as: 'posts',
          }
        ]
      }
    )
    .then(followedUsers => {
      res.status(200).json(followedUsers)
    })
  })
}

exports.post_like = (req, res, next) =>{
  const id = req.params.id;
  const token = req.headers.authorization.split(" ")[1];
  Post.findByPk(id)
  .then(post => {
    User.findByPk(jwt.decode(token).id, {
      include: [
        {
          model: Post,
          as: 'likedPosts',
        }
      ]
    })
    .then(user => {
      user.setLikedPosts([post])
      res.status(200).json({message: post})
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
}