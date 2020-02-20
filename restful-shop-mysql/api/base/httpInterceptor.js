class AppHttpInterceptor {
  intercept(req, res, next) {
    if (res && res.body) {
      res.body = {
        change: "hehe"
      };
    }
    next();
  }

  // next() {

  // }
}

module.exports = AppHttpInterceptor;
