const isLoggedIn = require('../services/isLoggedIn');
const md = require('markdown-it')();
const db = require('../models/index');
const slug = require('slug');

module.exports = app => {
  // stories view //

  app.get('/stories/new', isLoggedIn, function(req, res) {
    res.render('stories/new');
  });

  app.get('/stories/:slug', (req, res) => {
    db.Stories.find({ where: { slug: req.params.slug } }).then(story => {
      var article_markdown = md.render(story.content);
      story.content = article_markdown;
      res.render('stories/view', { story: story });
    });
  });

  // admin routes, login, story, new

  app.post('/stories', isLoggedIn, function(req, res) {
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

  app.get('/stories/:id/edit', isLoggedIn, function(req, res) {
    db.Stories.findOne({ where: { id: req.params.id } })
      .then(story => {
        res.render('stories/edit', { story: story });
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.put('/stories/:id', isLoggedIn, function(req, res) {
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

  app.delete('/stories/:id', function(req, res) {
    db.Stories.destroy({
      where: { id: req.params.id }
    }).then(deletedStory => {
      res.redirect('/');
    });
  });
};
