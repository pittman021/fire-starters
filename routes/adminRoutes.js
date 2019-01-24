const passport = require('passport');

module.exports = app => {
  // Login Form
  app.get('/admin/login', function(req, res) {
    res.render('admin/login');
  });

  // Logout
  app.get('/admin/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // Login Route
  app.post('/admin/login', passport.authenticate('local-login', { failureRedirect: '/admin/login' }), function(req, res) {
    res.redirect('/');
  });

  // app.get('/admin/signup', function(req, res) {
  //   res.render('admin/signup');
  // });

  // app.post('/admin/signup', passport.authenticate('local-signup', { failureRedirect: '/admin/signup' }), (req, res) => {
  //   res.redirect('/');
  // });
};
