require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

//Import router;
const userRouter = require('./routes/user.router');
const postRouter = require('./routes/post.router');

const app = express();
const port = 3000;

app.use('images', express.static(path.join(__dirname, 'images')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Protect from CORS error
app.use(cors());

app.use('/users', userRouter);
app.use('/posts', postRouter);

module.exports = app.listen( port, () => {});
