const express = require('express');
const cors = require('cors');

//Import router;
// const studentRouter = require('./routes/student.router');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Protect from CORS error
app.use(cors());

// app.use('/students', studentRouter);

app.listen( port, () => {});
