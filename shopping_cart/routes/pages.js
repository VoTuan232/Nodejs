var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  // res.send('working');
  res.render('index', {
    title: 'Home',
  });
})

// exports 
module.exports = router;