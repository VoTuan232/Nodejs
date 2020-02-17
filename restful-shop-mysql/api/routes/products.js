const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});
const upload = multer({
  storage: storage
});

const Product = require('../models/product');
const ProductController = require('../controllers/products');

/**
 * @swagger
 * /products:
 *    get:
 *      description: Get all product!
 *      produces:
 *        - application/json
 *      responses: 
 *        200:
 *          description: Get all product successfully!
 */
router.get('/', checkAuth, ProductController.getAllProduct);

/**
 * @swagger
 * /products:
 *    post:
 *      description: Create a product!
 *      produces:
 *        - application/json
 *      responses: 
 *        200:
 *          description: Create product successfully!
 */
router.post('/', upload.single('productImage'), checkAuth, (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product.save()
    .then(response => {
      res.status(201).json({
        message: 'Product created!',
        product: {
          _id: response._id,
          name: response.name,
          price: response.price,
        },
        request: {
          type: 'POST',
          url: 'http://localhost:3000/products/'
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
});

/**
 * @swagger
 * /products/:productId:
 *    get:
 *      description: Get all product!
 *      produces:
 *        - application/json
 *      responses: 
 *        200:
 *          description: get all product successfully!
 */
router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select('name price _id')
    .exec()
    .then(result => {
      if (result) {
        res.status(200).json({
          product: result,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/products/' + result._id
          }
        });
      } else {
        res.status(404).json({
          message: 'No valid entry found for provide ID'
        });
      }
    })
    .catch(err => {
      console.log(error);
      res.status(500).json({
        error: err
      })
    });

});

/**
 * @swagger
 * /products:
 *    get:
 *      description: Get all product!
 *      produces:
 *        - application/json
 *      responses: 
 *        200:
 *          description: get all product successfully!
 */
router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId;
  // const updateOps = {};
  // for (const ops of req.body) {
  //   console.log(ops);
  //   updateOps[ops.propName] = ops.value;
  // }
  const updateData = {
    ...req.body.name ? {
      name: req.body.name
    } : {},
    ...req.body.price ? {
      price: req.body.price
    } : {},
  }
  Product.update({
      _id: id
    }, {
      $set: updateData
    })
    // Product.update({_id: id}, { $set: { name: req.body.name, price: req.body.price }})
    // Product.update({_id: id}, { $set: updateOps})
    .exec()
    .then(result => {
      Product.findById(id).select('name price _id')
        .exec()
        .then(p => {
          res.status(200).json({
            message: 'Product udpated!',
            product: {
              _id: p._id,
              name: p.name,
              price: p.price,
            },
            request: {
              type: 'PATCH',
              url: 'http://localhost:3000/products/' + id
            }
          });
        })
        .catch(err => {
          console.log(err);
          res.status(404).json({
            error: err
          });
        })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
});

/**
 * @swagger
 * /products:
 *    get:
 *      description: Get all product!
 *      produces:
 *        - application/json
 *      responses: 
 *        200:
 *          description: get all product successfully!
 */
router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.remove({
      _id: id
    })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Product deleted!',
        request: {
          type: 'PATCH',
          url: 'http://localhost:3000/products/'
        }
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: error
      })
    })
})

module.exports = router;