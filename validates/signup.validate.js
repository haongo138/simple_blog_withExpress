const User = require('../models/user.model');

module.exports.postSignup = async (req, res, next) => {
  const username = req.body.username;
  const existedUser = await User.findOne({username: username});
  let errors = [];
  if(!req.body.name) {
    errors.push("Your name must be given !");
  }
  if(!req.body.username) {
    errors.push("An username is required !");
  }
  if(existedUser) {
    errors.push("Username have already been taken.. Please choose another !!");
  } 
  
  if(!req.body.password) {
    errors.push("A password is required");
  }
  if(!req.body.email) {
    errors.push("Email is required");
  }
  if(!req.body.gender) {
    errors.push("Gender is required");
  }
  if(errors.length) {
    res.render('users/signup', {
      errors: errors,
      value: req.body
    });
    return;
  }
  next();
}