const Order = require('../models/order');

exports.orders_get_all = (req, res, next) => {
  Order.find()
  .select('product _id quantity')
  .populate('product', 'name') // get data of product schema
  .exec()
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err,
    })
  })
}