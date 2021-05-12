const models = require('../models');
const User = models.User;
const Post = models.Post;
const Comment = models.Comment;
const Hashtag = models.Hashtag;

User.bulkCreate([
    {
        email: 'john-doe@domain.com',
        login: 'JohnDoe',
        birthdate:'1991-05-18',
        password: 'hello'
    },
    {
        email: 'plop@domain.com',
        login: 'Plop',
        birthdate:'1996-04-23',
        password: 'hey'
    },
    {
        email: 'fake@domain.com',
        login: 'Fake',
        birthdate:'1990-08-02',
        password: 'test'
    }
])
.then((newUsers)=>{
    console.log(newUsers);
    newUsers.map(user => {
        user.setFollowers(newUsers)
        .then((followersToFollowed) => {
            console.log(followersToFollowed)
        })
    })
})
.catch((err) => {
    console.log("Error while users creation : ", err)
})

Post.bulkCreate([
    {
        img: 'https://uknow.uky.edu/sites/default/files/styles/twitter_summary_large/public/GettyImages-1160947136%20%281%29.jpg?itok=kGxETWWH',
        userId: 1,
        location:'Hawaï',
        description: '#vacances'
    },
    {
        img: 'https://uknow.uky.edu/sites/default/files/styles/twitter_summary_large/public/GettyImages-1160947136%20%281%29.jpg?itok=kGxETWWH',
        userId: 1,
        location:'Caraïbes',
        description: '#plage'
    },
    {
        img: 'https://uknow.uky.edu/sites/default/files/styles/twitter_summary_large/public/GettyImages-1160947136%20%281%29.jpg?itok=kGxETWWH',
        userId: 2,
        location:'Floride',
        description: '#US'
    }
])
.then((newPosts)=>{
    User.findAll({where: {id: [1,2,3]}, include:['likedPosts']})
    .then((users)=>{
        users.map(user=> {
            user.setLikedPosts(newPosts)
        })
    })
})
.catch((err) => {
    console.log("Error while post creation : ", err)
})

Comment.bulkCreate([
    {
        content: 'Ce post est génial!',
        userId: 1,
        postId: 1
    },
    {
        content: 'Wow la photo est incroyable',
        userId: 1,
        postId:2
    },
    {
        content: "J'adore",
        userId: 2,
        postId:2
    }
])
.then((newComments)=>{
    console.log(newComments);
    newComments.map(comment => {
        comment.setAnswsers(newComments)
    })
})
.catch((err) => {
    console.log("Error while comments creation : ", err)
})

Hashtag.bulkCreate([
    {
        name: '#vacances',
    },
    {
        name: '#chill',
    },
    {
        name: "#plage",
    }
])
.then((newHashtags)=>{
    Post.findAll({where: {id: [1,2,3]}, include:['hashtags']})
    .then((posts)=>{
        posts.map(post=> {
            post.setHashtags(newHashtags)
        })
    })
})
.catch((err) => {
    console.log("Error while hashtags creation : ", err)
})


User.findByPk(
    1,
    {include: ['followers', 'posts', 'followedUsers', 'likedPosts', 'comments']}
)
.then((findedUser)=> {
    console.log(findedUser.followers),
    console.log(findedUser.posts),
    console.log(findedUser.followedUsers),
    console.log(findedUser.likedPosts),
    console.log(findedUser.comments)
})



