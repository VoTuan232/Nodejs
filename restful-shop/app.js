const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");

const configDatabase = require("./api/config/database");

app.enable("trust proxy");

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
const swaggerDocs = require("./swaggerJsdoc");
swaggerDocs(app);

// connect db and seeder faker
mongoose.connect(configDatabase.database, {
  useCreateIndex: true,
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection to mongodb error:"));
db.once("open", function () {
  console.log("Connected to Mongodb");
});

// middleware for logged
app.use(morgan("dev"));
// middleare for parse body
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// pass header for pass cors
app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'http://my-cool-page.com');
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// rate limit middleware
const limiter = rateLimit({
  windowMs: 0.5 * 60 * 1000, // .5 minutes
  // delayMs: 365*24*60*60*1000, // delaying - 365 days until the max limit is reached
  // max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many accounts created from this IP, please try again!"
});
app.use(limiter); // apply all request

// router
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
// app.use('/api', swaggerUi.serve, swaggerUi.setup(swagger, options));

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/users");
const carMarkerRoutes = require("./api/routes/carMarkers");
const carMarkerCarNameRoutes = require("./api/routes/carMakerCarNames");

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);
app.use("/car_makers", carMarkerRoutes);
app.use("/car_maker_car_names", carMarkerCarNameRoutes);
// app.use('/api/v1', productRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
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