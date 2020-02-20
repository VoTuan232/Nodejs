const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");

const configDatabase = require("./api/config/database");
const connection = require("./api/database/connection");
const appInterceptor = new (require("./api/base/httpInterceptor"))();
const ObjectUtil = new (require("./api/utils/object"))();

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
// connection.connect(err => {
//   if (err) {
//     console.error("An error occurred while connecting to the DB");
//     throw err;
//   } else {
//     console.log("connect to mysql successfully!");
//   }
// });

// express validator

// middleware for logged
app.use(morgan("dev"));

// middleare for parse body
// assuming POST: name=foo&color=red            <-- URL encoding
// POST: {"name":"foo","color":"red"}  <-- JSON encoding
app.use(
  bodyParser.urlencoded({
    extended: true
  })
); // to support URL-encoded bodies
app.use(bodyParser.json()); // to support JSON-encoded bodies

// middleware change response
let modifyResponseBody = (req, res, next) => {
  let oldSend = res.send;

  res.send = function(data) {
    // console.log(arguments);
    // arguments[0] (or `data`) contains the response body
    // arguments[0] = "modified : " + arguments[0];
    oldSend.apply(res, arguments);
  };
  next();
};
app.use(modifyResponseBody);

// middleware change req body
// app.use((req, res, next) => {
//   res.end(JSON.stringify(req.body, null, 2));
// });
app.use((req, res, next) => {
  let rq = {};
  for (let key in req.body) {
    rq[key] = req.body[key];
  }
  rq = ObjectUtil.convertKeyToCamelCase(rq);

  req.body = rq;
  next();
});

// pass header for pass cors
app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.header("Access-Control-Allow-Origin", "http://my-cool-page.com");
  res.header("Access-Control-Allow-Origin", "*"); // all website can access
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
// app.use(limiter); // apply all request

// router
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
// app.use('/api', swaggerUi.serve, swaggerUi.setup(swagger, options));

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/users");
const carMarkerRoutes = require("./api/routes/carMarkers");
const carMarkerCarNameRoutes = require("./api/routes/carMakerCarNames");
const carGradeStyleRoutes = require("./api/routes/carGradeStyles");
const carCertifyStyles = require("./api/routes/carCertifyStyles");
const genericCodes = require("./api/routes/genericCodes");
const carSpecifications = require("./api/routes/carSpecifications");
const carCategoryColors = require("./api/routes/carCategoryColor");

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);
app.use("/car_makers", carMarkerRoutes);
app.use("/car_maker_car_names", carMarkerCarNameRoutes);
app.use("/car_grade_styles", carGradeStyleRoutes);
app.use("/car_certify_styles", carCertifyStyles);
app.use("/generic_codes", genericCodes);
app.use("/car_specifications", carSpecifications);
app.use("/car_category_colors", carCategoryColors);
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

// middleware interceptor
// app.use(appInterceptor.intercept);

module.exports = app;
