const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/sigup', (req, res, next) => {

  bcrypt.hash(req.body.password, null, null, (err, hash) => {
    User.findOne({
        email: req.body.email,
      })
      .exec()
      .then(user => {
        if (user) {
          res.status(409).json({
            message: 'Email exits!',
          })
        } else {
          if (err) {
            return res.status(500).json({
              message: 'Fail when encode!',
              error: err
            });
          } else {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });
            user.save()
              .then(result => {
                res.status(201).json({
                  message: 'User created!',
                  user: result,
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err,
                })
              })
          }
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err,
        })
      })
  });
});

router.post('/login', (req, res, next) => {
  User.findOne({email: req.body.email})
  .exec()
  .then(result => {
    if (result) {
      bcrypt.compare(req.body.password, result.password, (err, isEqual) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth fail!',
          });
        } else {
          if (isEqual) {
            const token = jwt.sign({
              email: result.email,
              userId: result._id,
              }, 
              process.env.JWT_KEY,
              {
                expiresIn: '1h',
              });
            console.log(token);
            return res.status(200).json({
              message: 'Auth success!',
              user: result,
              token: token,
            })
          } else {
            return res.status(401).json({
              message: 'Auth fail!',
            });
          }
        }
      })
    } else {
      return res.status(401).json({
        message: 'Auth fail!',
      });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err,
    })
  })
})

module.exports = router;