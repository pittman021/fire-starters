const db = require('../models/index');

module.exports = app => {
  app.get('/', function(req, res) {
    db.Stories.findAll({
      limit: 100,
      order: [['updatedAt', 'DESC']]
    })
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

  app.get('*', function(req, res) {
    res.redirect('/');
  });
};
