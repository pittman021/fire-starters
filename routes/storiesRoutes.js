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
  // stories view //

  app.get('/stories/new', isLoggedIn, function(req, res) {
    res.render('stories/new');
  });

  app.get('/stories/images', isLoggedIn, function(req, res) {
    res.render('stories/images');
  });

  app.get('/stories/:slug', (req, res) => {
    db.Stories.find({ where: { slug: req.params.slug } }).then(story => {
      var article_markdown = md.render(story.content);
      story.content = article_markdown;
      res.render('stories/view', { story: story });
    });
  });

  // admin routes, login, story, new  upload.single('img')
  app.post('/stories', function(req, res) {
    db.Contact.create(req.body.contact).then(newContact => {
      db.Stories.create({
        ContactId: newContact.id,
        title: req.body.stories.title,
        slug: slug(req.body.stories.title),
        img: req.body.stories.img,
        content: req.body.stories.content
      }).then(newStory => {
        res.redirect('/');
      });
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

  app.post('/stories/images', isLoggedIn, upload.single('img'), function(req, res) {
    res.redirect('/');
  });

  app.put('/stories/:id/image', upload.single('img'), function(req, res) {
    db.Stories.find({
      where: { id: req.params.id }
    }).then(story => {
      var img = req.body.img;
      var storyData = story.get({ plain: true });
      var path = `public/images/uploads/${storyData.img}`;

      fs.exists(path, exists => {
        if (exists) {
          fs.unlink(path, err => {
            if (err) {
              console.log(err);
            } else {
              story.update({ img: req.file.filename }).then(() => {
                console.log(`${story.img} was deleted`);
                res.redirect('/');
              });
            }
          });
        } else {
          story.update({ img: req.file.filename }).then(() => {
            res.redirect('/');
          });
        }
      });
    });
  });

  app.delete('/stories/:id', function(req, res) {
    db.Stories.findById(req.params.id).then(story => {
      var path = `public/images/${story.img}`;
      //
      fs.exists(path, exists => {
        if (exists) {
          fs.unlink(path, err => {
            if (err) {
              console.log(err);
            } else {
              story.destroy().then(deletedStory => {
                res.redirect('/');
              });
            }
          });
        } else {
          story.destroy().then(deletedStory => {
            res.redirect('/');
          });
        }
      });
      // });
    });
  });
};
