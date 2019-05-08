const express = require('express');
const dotenv = require('dotenv').config();

// create Express app
const app = express();

// import Router
const indexRoute = require('./routes/index.route');

// config view engine
app.set('view engine', 'pug');

// router call
app.use(indexRoute);

// start server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});