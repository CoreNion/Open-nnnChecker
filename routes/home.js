var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.session.isNAccount) {
    res.render('home', { email: req.session.email });
  } else {
    res.redirect("./");
  }
});

module.exports = router;