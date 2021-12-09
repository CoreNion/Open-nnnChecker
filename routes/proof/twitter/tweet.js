var express = require('express');
var createError = require('http-errors');
var { TwitterApi } = require('twitter-api-v2');
var router = express.Router();

router.get('/', function(req, res, next) {
  
  if (!req.session.isNAccount && !req.session.twitterAcsessToken && !req.session.twitterAcsessSecret) {
    next(createError(404));
  } else {
    const twitterClient = new TwitterApi({ appKey: process.env.TWITTER_APP_KEY,
       appSecret: process.env.TWITTER_APP_SECRET,
       accessToken: req.session.twitterAcsessToken,
       accessSecret: req.session.twitterAcsessSecret
      });
    
    //アカウント情報を用いてツイートし、result.pugでツイート(結果)を表示
    twitterClient.v1.tweet('私はN/S高生です！\nこのツイートはOpen nnnCheckerを通してツイートされました。\nなお、開発者向けのバージョンであるため、この情報は正確ではありません。\n#nnnChecker\nhttps://nnnchecker.herokuapp.com/').then((result) => {
      res.render('proof/twitter/tweet', { userName: req.session.twitterScreenName, tweetID: result.id_str });
    }).catch((err) => {
      err["status"] = 500
      err["message"] = "Internal Server Error"
      err["userMessage"] = "ツイートに失敗しました。<br>もう一度ログインをするか、暫くたってから、もう一度お試しください。<br>サーバーで障害が発生している可能性もあります。";
      next(err);
    });
  }
});

module.exports = router;