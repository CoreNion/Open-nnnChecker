var express = require('express');
var router = express.Router();
var { TwitterApi } = require('twitter-api-v2');
var createError = require('http-errors');

/* Twitterからのコールバックを受け取る */
router.get('/', function (req, res, next) {
  if (req.session.isNAccount) {
    const { oauth_token, oauth_verifier } = req.query;
    const { oauth_token_secret } = req.session;

    if (!oauth_token || !oauth_verifier || !oauth_token_secret) {
      next(createError(400));
    } else {
      const client = new TwitterApi({
        appKey: process.env.TWITTER_APP_KEY,
        appSecret: process.env.TWITTER_APP_SECRET,
        accessToken: oauth_token,
        accessSecret: oauth_token_secret,
      });
  
      client.login(oauth_verifier)
        .then(({ client: loggedClient, accessToken, accessSecret }) => {
          //アクセストークン等をセッションに保存
          req.session.twitterLogin = true;
          req.session.twitterAcsessToken = accessToken;
          req.session.twitterAcsessSecret = accessSecret;

          //アカウント情報をセッションに保存
          loggedClient.currentUser().then((user) => {
            req.session.twitterScreenName = user.screen_name;
            req.session.twitterName = user.name;
            req.session.twitterProfileImage = user.profile_image_url_https.replace("_normal","");
            res.redirect("./result");
          });
        }).catch((err) => {
          err["status"] = 500
          err["message"] = "Internal Server Error"
          err["userMessage"] = "サーバーでエラーが発生しました。<br>もう一度ログインをするか、暫くたってから、もう一度お試しください。<br>サーバーで障害が発生している可能性もあります。";
          next(err);
        });
    }
  } else {
    next(createError(404));
  }
});

module.exports = router;