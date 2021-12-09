var express = require('express');
var router = express.Router();
var { TwitterApi } = require('twitter-api-v2');
var createError = require('http-errors');

router.get('/', function (req, res, next) {
  if (req.session.isNAccount) {
    //Twitterログイン用のリンクを取得し、ログイン用のページへリダイレクト
    const client = new TwitterApi({ appKey: process.env.TWITTER_APP_KEY, appSecret: process.env.TWITTER_APP_SECRET });
    client.generateAuthLink(process.env.TWITTER_REDIRECT_URL).then((result) => {
      req.session.oauth_token_secret = result.oauth_token_secret;
      res.redirect(result.url);
    }).catch((err) => {
      err["status"] = 500
      err["message"] = "Internal Server Error"
      err["userMessage"] = "サーバーでエラーが発生しました。<br>もう一度ログインをするか、暫くたってから、もう一度お試しください。<br>サーバーで障害が発生している可能性もあります。";
      next(err);
    });
  } else {
    next(createError(404));
  }
});

module.exports = router;