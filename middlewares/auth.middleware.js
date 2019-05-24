const User = require('../models/user.model');

module.exports.requireAuth = async (req, res, next) => {
  if(!req.signedCookies.userId) {
    return res.redirect('users/login');
  }
  let existedUser = await User.findOne({ _id: req.signedCookies.userId });
  if (!existedUser) {
    return res.redirect('users/login');
  }
  res.locals.currentUser = existedUser;
  next();
}