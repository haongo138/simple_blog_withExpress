import md5 from 'md5';
const User = require('../models/user.model'); 

// GET requests
module.exports.index = async (req, res) => {
  const users = await User.find({});
  res.render('users/index', {
    users: users
  });
}

module.exports.signupForm = (req, res) => {
  res.render('users/signup');
};

module.exports.loginForm = (req, res) => {
  res.render('users/login');
};

// POST requests
module.exports.postSignup = async (req, res) => {
  
  req.body.password = md5(req.body.password);
  if(req.file) {
    req.body.avatar = req.file.path.replace(/\\/g, "/").substring("public".length).split('/').slice(1).join('/');
  }
  else {
    req.body.avatar = "uploads/no_image.jpg";
  }
  const user = new User(req.body);
  user.save(function(err) {
    if (err) throw err;
  });
  res.redirect('/users');
};

module.exports.postLogin = async (req, res) => {
  const inputUsername = req.body.username;
  let errors = [];
  const existedUser = await User.findOne({ username: inputUsername });
  if (!existedUser) {
    return res.render('users/login', {
      errors: ["User doesn't exist !!"]
    });
  } 
  
  const hashedPassword = md5(req.body.password);
  if (existedUser.password !== hashedPassword) {
    return res.render('users/login', {
      errors: ["Wrong password !!"]
    });
  }
  res.cookie('userId', existedUser.id, {
    signed: true
  });
  res.redirect('/users');
}