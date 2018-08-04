var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.cookie('user','test', {
      // sameSite: 'strict'
  })
  res.send('Request have cookie:' + JSON.stringify(req.cookies));
});

module.exports = router;
