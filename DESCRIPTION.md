# 仕様まとめ

## コマンド一覧

- `/search_books` <- 検索用モーダルを表示します

## 環境変数

- GAS_SPREAD_SHEET

　書籍データが保管されているスプレッドシートのAPIのURL

- NODE_ENV
 
  `production` に設定
 
- NPM_CONFIG_PRODUCTION
 
  `false` に設定
 
- POST_CHANNEL_NAME

  アプリを導入したいチャンネル名
 
- SLACK_BOT_TOKEN

  slack アプリの `xoxb-` から始まるトークン
  
- SLACK_SIGNING_SECRET

  slack アプリのサインイン シークレットトークン
  
  詳しくは [公式ドキュメント](https://api.slack.com/docs/verifying-requests-from-slack) を参照

## 必要な権限

- `incoming-webhook` <- 特定のチャンネルにメッセージを送信する権限

- `channels:join` <- ワークスペースの中の共同チャンネルに参加する権限

- `chat:write` <- ボットとしてメッセージを送信する権限

- `commands` <- ショートカットや/コマンドに反応する権限

