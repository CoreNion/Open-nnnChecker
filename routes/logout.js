var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  //セッション初期化
  req.session = null;
  res.redirect("./");
});

module.exports = router;