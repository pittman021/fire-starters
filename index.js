const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models/index');
const passport = require('passport');
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

// Passport Config //
db.sequelize
  .authenticate()
  .then(() => {
    console.log('connection established');
  })
  .catch(err => {
    console.log('unable to connect', err);
  });

db.sequelize.sync({ force: true });

// ROUTES //
require('./routes/storiesRoutes')(app);
require('./routes/adminRoutes')(app);
require('./routes/pageRoutes')(app);

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('server is up and running');
});
