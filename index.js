const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models/index');
const md = require('markdown-it')();
const passport = require('passport');
const slug = require('slug');
const methodOverride = require('method-override');

require('./services/passport');

// configuration

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.adminUser = req.user;
  next();
});
// app.use(methodOverride('_method'));

// Passport Config //

db.sequelize
  .authenticate()
  .then(() => {
    console.log('connection established');
  })
  .catch(err => {
    console.log('unable to connect', err);
  });

db.sequelize.sync();

// --------- ROUTES ----------- //

// GET /admin
// POST /admin/isLoggedIn
//
// GET stories/new
// POST stories
// PATCH stories/:slug
// /stories/new, isloggedin

// stories view //

app.get('/stories/:slug', (req, res) => {
  console.log(req.params);
  db.Stories.find({ where: { slug: req.params.slug } }).then(story => {
    var article_markdown = md.render(story.content);
    story.content = article_markdown;
    res.render('stories/view', { story: story });
  });
});

// admin routes, login, story, new

app.get('/admin', function(req, res) {
  res.render('admin/login');
});

app.post('/admin', passport.authenticate('local-login', { failureRedirect: '/admin' }), function(req, res) {
  res.redirect('/');
});

app.get('/admin/stories/new', function(req, res) {
  res.render('admin/new');
});

app.post('/admin/stories', function(req, res) {
  db.Stories.create({
    contact_name: req.body.contact_name,
    title: req.body.title,
    slug: slug(req.body.title),
    img: req.body.img,
    content: req.body.content
  }).then(newStory => {
    res.redirect('/');
  });
});

app.get('/admin/stories/:id/edit', function(req, res) {
  db.Stories.findOne({ where: { id: req.params.id } })
    .then(story => {
      res.render('admin/edit', { story: story });
    })
    .catch(err => {
      console.log(err);
    });
});

app.put('/admin/stories/:id', function(req, res) {
  const updates = req.body;
  db.Stories.find({
    where: { id: req.params.id }
  })
    .then(story => {
      return story.updateAttributes(updates);
    })
    .then(updatedStory => {
      res.redirect('/');
    });
});

app.delete('/admin/stories/:id', function(req, res) {
  db.Stories.destroy({
    where: { id: id }
  }).then(deletedStory => {
    res.redirect('/');
  });
});

// main site pages

app.get('/', function(req, res) {
  console.log(req.locals);
  db.Stories.findAll({})
    .then(stories => {
      res.render('home', { stories: stories });
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/about', function(req, res) {
  res.render('about');
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('server is up and running');
});
