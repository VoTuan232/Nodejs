const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

const checkAuth = require('../middleware/check-auth');

const OrderController = require('../controllers/orders');

// Handle incoming Get requests to /orders
router.get('/', checkAuth, OrderController.orders_get_all);

router.post('/', checkAuth, (req, res, next) => {
  Product.findById(req.body.productId)
  .exec()
  .then(p => {
    if (!p) {
      return res.status(404).json({
        message: 'Product not found!',
      });
    }
    const order = new Order({
      _id: mongoose.Types.ObjectId(),
      product: req.body.productId,
      quantity: req.body.quantity,
    });
    order.save()
  })
  .then(order => {
    res.status(201).json({
      message: 'Order created!',
      order: order,
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err,
    })
  })
});

router.get('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  if (id === 'special') {
    res.status(200).json({
      message: 'Special Id',
      id: id,
    });
  } else {
    res.status(200).json({
      message: 'Not special Id',
      id: id,
    });
  }
});

router.patch('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: 'Updated order!'
  });
});

router.delete('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: 'Deleted order!'
  });
});

module.exports = router;