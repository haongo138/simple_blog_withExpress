import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// create Express app
const app = express();

// config env
dotenv.config();

// connect Mongodb
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, (err) => {
  err ? console.error('err') : console.log('Database connected successful !!');
});

// import Router
const indexRoute = require('./routes/index.route');
const userRoute = require('./routes/users/user.route');

// config view engine
app.set('view engine', 'pug');

// middlewares
app.use(bodyParser.json()); //for parsing  application/json
app.use(bodyParser.urlencoded({ extend: true})); //for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser(process.env.SECRET));

// router use
app.use(indexRoute);
app.use(userRoute);

// start server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});