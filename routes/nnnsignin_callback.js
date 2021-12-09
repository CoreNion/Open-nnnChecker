var express = require('express');
var router = express.Router();
var createError = require('http-errors');
require("express-async-errors");

const checkNNNAccount = require("./lib/checkNNNAcount");

/* Googleからのコールバックを受け取る */
router.get('/', (req, res, next) => {
  const code = req.query.code
  if (!req.query.code) {
    next(createError(400));
  }
  
  checkNNNAccount.codeToCredentials(code).then(() => {
    checkNNNAccount.checkNNNAccount().then((isNAccount) => {
      if (isNAccount) {
        //セッションにN高のアカウントであることとメールアドレスを保存しホームへ
        req.session.isNAccount = true
        req.session.email = isNAccount[1];
        res.redirect("./home");
      } else {
        next({ status : 403, message: "Forbidden", userMessage : "ログインされたアカウントは、N/S高等学校用のアカウントでは無いため、このサービスは利用できません。" });
      }
    });
  }).catch((err) => {
    err["status"] = 500
    err["message"] = "Internal Server Error"
    err["userMessage"] = "サーバーでエラーが発生しました。<br>もう一度ログインをするか、暫くたってから、もう一度お試しください。<br>サーバーで障害が発生している可能性もあります。";
    next(err);
  });
});

module.exports = router;