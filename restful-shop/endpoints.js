const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /users:
 *    get:
 *      description: This should return all users
 */
router.get('/user/alls', (req, res) => {
  res.end('This should');
});

module.exports = router;