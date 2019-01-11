const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models/index');
var md = require('markdown-it')();

// configuration

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
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

app.get('/stories/:slug', (req, res) => {
  console.log(req.params);
  db.Stories.find({ where: { slug: req.params.slug } }).then(story => {
    console.log(story);
    var article_markdown = md.render(story.content);
    story.content = article_markdown;
    res.render('stories/view', { story: story });
  });
});

app.get('/', function(req, res) {
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

let port = 3000;
app.listen(port, () => {
  console.log('server is up and running');
});
