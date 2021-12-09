var express = require('express');
var router = express.Router();

const checkNNNAccount = require("./lib/checkNNNAcount");

router.get('/', function(req, res, next) {
  //認証用のURLを取得してリダイレクト
  res.redirect(checkNNNAccount.getAuthUrl())
});

module.exports = router;
