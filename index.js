import express from 'express';
import dotenv from 'dotenv';

// config env
dotenv.config();

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