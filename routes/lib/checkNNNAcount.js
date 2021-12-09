const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
require("express-async-errors");

const CLIENT_ID =  process.env.GOOGLE_CLIENT_ID ,
  CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET,
  REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL,
  SCOPE = 'https://www.googleapis.com/auth/userinfo.email';

var auth = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

/**
 * Googleのアカウント連携用のUrlを入手する関数
 * @returns Google Auth Url
 */
function getAuthUrl() {
  return auth.generateAuthUrl({ scope: SCOPE });
}

/**
 * コールバックのコードからCredentialsを設定する関数
 * @param {string} コールバックに含まれているコード
 */
async function codeToCredentials(code) {
  const {tokens} = await auth.getToken(code);
  auth.setCredentials(tokens);
}

/**
 * Googleアカウントのユーザー情報からnnn.ed.jpのアカウントかをチェックする関数
 * @returns nnn.ed.jp: true,メールアドレス それ以外: false
 */
async function checkNNNAccount() {
  let oauth2 = null;
  let ret = null;
  oauth2 = google.oauth2({
    auth: auth,
    version: 'v2'
  });

  //ユーザー情報を取得
  const user = await (await oauth2.userinfo.get()).data;
  if (user.hd == "nnn.ed.jp") {
    ret = [true, user.email];
  } else {
    ret = false;
  }
  return ret;
}

module.exports = {
  getAuthUrl,
  codeToCredentials,
  checkNNNAccount
};