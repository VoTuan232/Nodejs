let createResponse = (res, status, message, data) => {
  return res.status(status).json({
    message,
    data
  });
};

exports.createResponse = this.createResponse;
