const express = require('express');
const router = express.Router();
const {
  check,
  validationResult
} = require('express-validator');

const User = require('../models/user');
const UserController = require('../controllers/users');

/**
 * @swagger
 *
 * definitions:
 *   NewUser:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *   User:
 *     allOf:
 *       - $ref: '#/definitions/NewUser'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */

// /**
//  * @swagger
//  * /user/sigup:
//  *    post:
//  *      description: Create a account!
//  *      produces:
//  *        - application/json
//  *      parameters:
//  *        - name: user
//  *          description: user object
//  *          in: body
//  *          required: true
//  *          schema:
//  *            $ref: '#/definitions/NewUser'
//  *      responses: 
//  *        201:
//  *          description: create user successfully!
//  *        422:
//  *          description: create user invalid value!
//  */


/**
 * @swagger
 * /user/sigup:
 *    post:
 *      description: Create a account!
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: email
 *          description: Username to use for login
 *          in: formData
 *          required: true
 *          type: string
 *        - name: password
 *          description: Password to use for login
 *          in: formData
 *          required: true
 *      responses: 
 *        201:
 *          description: create user successfully!
 *        422:
 *          description: create user invalid value!
 */
router.post('/sigup', [
  check('email', 'Email wrong format!').isEmail(),
  check('password', 'Password length at least 5 charactor!').isLength({
    min: 5
  })
], UserController.userSigup);

/**
 * @swagger
 * /user/login:
 *    post:
 *      description: Login to the application!
 *      produces: 
 *        - application/json
 *      parameters:
 *        - name: email
 *          description: Username to use for login.
 *          in: body
 *          required: true
 *          type: string
 *        - name: password
 *          description: Password to use for login.
 *          in: body
 *          required: true
 *      responses:
 *        200:
 *          description: Login successfull!
 */
router.post('/login', UserController.login);

/**
 * @swagger
 * /user/get-all:
 *    get:
 *      description: Return all users
 *      produces: 
 *        - application/json
 *      responses:
 *        200: 
 *          description: A successfull response
 */
router.get('/get-all', UserController.getUsers)

module.exports = router;