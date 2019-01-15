function isLoggedIn(req, res, next) {
  if (!req.user) {
    res.redirect('/admin/login');
  } else {
    next();
  }
}

module.exports = isLoggedIn;
