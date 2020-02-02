var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var config = require('./config/database');

var fileUpload = require('express-fileupload');

var passport = require('passport');
// connect db
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection to mongodb error:'));
db.once('open', function() {
  console.log('Connected to Mongodb');
});

// init app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set pulic folder
app.use(express.static(path.join(__dirname, 'public')));

// set global error
app.locals.errors = null;

// express file upload middleware
app.use(fileUpload());

// body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// express session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

// express validator
app.use(expressValidator({
  customValidators: {
    errorFormatter: (param, msg, value) => {
      const namespace = param.split('.')
          , root      = namespace.shift()
          , formParam = root;
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    },
    isImage: function (value, filename) {
      var extension = (path.extname(filename)).toLowerCase();
      switch(extension) {
        case '.jpg':
          return '.jpg';
        case '.png':
          return '.png';
        case '.jpeg':
          return '.jpeg';
        case '':
          return '.jpg';
        default:
          return false;
      }
    }
  }
}));

// express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// passport config
require('./config/passport')(passport);
// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// set router
var pages = require('./routes/pages.js');
var adminPages = require('./routes/admin_pages.js');
var adminCategories = require('./routes/admin_categories.js');
var adminProducts = require('./routes/admin_products.js');
app.use('/', pages);
app.use('/admin/pages', adminPages);
app.use('/admin/categories', adminCategories);
app.use('/admin/products', adminProducts);

// start the server
var port = 3000;
app.listen(port, function () {
  console.log('Server started at ' + port)
});