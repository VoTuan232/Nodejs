const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// swagger ui
// const swaggerUi = require('swagger-ui-express'),
//   swaggerDocument = require('./swagger-doc.json');
// swagger = require('./swagger.json');
// const options = {
//   swaggerOptions: {
//     explorer: true,
//     validatorUrl: null,
//   },
//   // customCss: '.swagger-ui .topbar { display: none }'
// };

// swagger generator
const swaggerDocs = require('./swaggerJsdoc');
swaggerDocs(app);

// connect db
mongoose.connect('mongodb://localhost/restful-shop', {
  useCreateIndex: true,
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection to mongodb error:'));
db.once('open', function () {
  console.log('Connected to Mongodb');
});

// middleware for logged
app.use(morgan('dev'));
//middleare for parse body
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// pass header for pass cors
app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'http://my-cool-page.com');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// router
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
// app.use('/api', swaggerUi.serve, swaggerUi.setup(swagger, options));

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);
// app.use('/api/v1', productRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

module.exports = app;