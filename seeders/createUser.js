const models = require('../models');
const User = models.User;
const Post = models.Post;
const Comment = models.Comment;
const Hashtag = models.Hashtag;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

bcrypt.hash("test1", 10, (err, hash) =>{
    if(err){
        throw err
    }

    let user = {
        login: "user1",
        email: "user1@gmail.com",
        birthdate: "1990-07-28",
        password: hash
    };

    User.create(user)
    .then( user =>{console.log(user)})
    .catch( err => console.log(err))
    }
)


bcrypt.hash("test2", 10, (err, hash) =>{
    if(err){
        throw err
    }

    let user = {
        login: "user2",
        email: "user2@gmail.com",
        birthdate: "1990-07-28",
        password: hash
    };

    User.create(user)
    .then( user =>{console.log(user)})
    .catch( err => console.log(err))
    }
)



