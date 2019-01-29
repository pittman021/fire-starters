const passport = require('passport');
const isLoggedIn = require('../services/isLoggedIn');
const md = require('markdown-it')();
const db = require('../models/index');
const slug = require('slug');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'public/images/uploads',
  filename: function(req, file, cb) {
    // const index = file.mimetype.indexOf('/');
    // const slice = file.mimetype.slice(index + 1);
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

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

  app.get('/admin/images', isLoggedIn, function(req, res) {
    res.render('admin/images/new');
  });

  app.post('/admin/images', isLoggedIn, upload.single('img'), function(req, res) {
    res.redirect('/');
  });
};
