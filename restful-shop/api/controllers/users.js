const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const {
  check,
  validationResult
} = require('express-validator');

exports.userSigup = (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Invalid validator!',
      errors: errors.array()
    });
  }
  bcrypt.hash(req.body.password, null, null, (err, hash) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Error When bcrypt password',
        error: err,
      });
    }
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
}

exports.getUsers = (req, res, next) => {
  User.find()
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Get All User',
        users: result.map(x => {
          return {
            _id: x._id,
            email: x.email,
          }
        }),
      });
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json({
        error: err,
      })
    })
}

exports.login = (req, res, next) => {
  User.findOne({
      email: req.body.email
    })
    .exec()
    .then(result => {
      if (result) {
        bcrypt.compare(req.body.password, result.password, (err, isEqual) => {
          if (err) {
            return res.status(401).json({
              message: 'Auth faild!',
              error: err,
            });
          } else {
            if (isEqual) {
              const token = jwt.sign({
                  email: result.email,
                  userId: result._id,
                },
                process.env.JWT_KEY, {
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
          message: 'Not found user!',
          data: {
            email: req.body.email ? req.body.email : 'email',
            password: req.body.password ? req.body.password : 'password',
          }
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Error when find user!',
        error: err,
      })
    })
}