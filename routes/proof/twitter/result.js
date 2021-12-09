var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.get('/', function (req, res, next) {
  if (!req.session.twitterLogin) {
    next(createError(404));
  } else {
    res.render('proof/twitter/result', { email: req.session.email,
      twitterName: req.session.twitterName, 
      twitterScreenName: req.session.twitterScreenName, 
      twitterImage: req.session.twitterProfileImage });
  }

});

module.exports = router;