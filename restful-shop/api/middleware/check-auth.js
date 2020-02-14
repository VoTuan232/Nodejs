const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // console.log(req.headers.authorization.split(" ")[1]);
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
    // console.log(decoded);
    next();
  } catch (error) {
    console.log("error");
    console.log(error);
    return res.status(401).json({
      message: "Auth fail!",
      error: error
    });
  }
};
