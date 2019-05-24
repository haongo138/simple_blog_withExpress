module.exports.postLogin = (req, res, next) => {
  let errors = [];
  if (req.signedCookies.userId) {
    return res.redirect('/users');
  }
  if (!req.body.username) {
    errors.push("You must input username");
  }
  if (!req.body.password) {
    errors.push("You must input password");
  }
  if (errors.length) {
    return res.render('users/login', {
      errors: errors
    });
  }
  next();
}