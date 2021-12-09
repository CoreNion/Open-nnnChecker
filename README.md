# オープンソース版 nnnChecker
オープンソース版のnnnCheckerです。

**オリジナルのnnncheckerは[こちら](nnnchecker.herokuapp.com)**

## nnnCheckerを動かすために必要な環境について
nnnCheckerを動かすためには、**GoogleのOAuth 2.0 クライアント**と**Twitter Api**にアクセスできる環境が必要です。

Google OAuth2.0の必要なスコープは、**userinfo.email**のみです。

TwitterのApp permissionsは**Read and Write**で、3-legged OAuthは有効化して設定してください。

# 主な環境
- 実行環境: **Docker, Node.js 14**
- フレームワーク: **Express.js**
  - HTMLエンジン: **Pug**
  - セッション: cookie-session
  - セキュリティ関連: helmet
- Goggle API: googleapis
- Twitter API: **twitter-api-v2**

# 必要な環境変数
各種キーは、環境変数に保存してください。

VS Codeのデバッグ機能などを活用しましょう。

## Google API関連
- GOOGLE_CLIENT_ID
  - OAuth 2.0のクライアント ID
- GOOGLE_CLIENT_SECRET
  - OAuth 2.0のクライアント シークレット
- GOOGLE_REDIRECT_URL
  - 設定されているログイン後のリダイレクト URI

## Twitter関連
- TWITTER_APP_KEY
  - API Key(Consumer Key)
- TWITTER_APP_SECRET
  - API Secret Key (Consumer Secret)
- TWITTER_REDIRECT_URL
  - 設定されているログイン後のコールバック URL

## その他
- SESSION_SECRET_KEY
  - セッションのsecret key
- (DEBUGなどのExpress.js用の環境変数)
  - 各自で設定してください。

# ライセンス
MIT LICENSE

[THIRD-PARTY-NOTICES](./THIRD-PARTY-NOTICES.txt)