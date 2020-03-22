export default ({name}:any):any => {
    return {
        "type": "modal",
        "title": {
          "type": "plain_text",
          "text": "本を探す :books:",
          "emoji": true
        },
        "callback_id": "search_books",
        "submit": {
          "type": "plain_text",
          "text": "検索",
          "emoji": true
        },
        "close": {
          "type": "plain_text",
          "text": "キャンセル",
          "emoji": true
        },
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `:book: ようこそ、${name}さん！`,
              "verbatim": true
            }
          },
          {
            "type": "divider"
          },
          {
            "type": "input",
            "block_id": "search",
            "label": {
              "type": "plain_text",
              "text": "キーワード",
              "emoji": true
            },
            "optional": false,
            "element": {
              "type": "plain_text_input",
              "action_id": "search",
              "placeholder": {
                "type": "plain_text",
                "text": "例) デザイン",
                "emoji": false
              }
            }
          },
          {
            "type": "input",
            "block_id": "place",
            "label": {
              "type": "plain_text",
              "text": "オフィス",
              "emoji": true
            },
            "optional": true,
            "element": {
              "type": "static_select",
              "action_id": "place",
              "placeholder": {
                "type": "plain_text",
                "text": "オフィスを選択",
                "emoji": true
              },
              "options": [
                {
                  "value": "東京",
                  "text": {
                    "type": "plain_text",
                    "text": "東京オフィス",
                    "emoji": true
                  }
                },
                {
                  "value": "大阪",
                  "text": {
                    "type": "plain_text",
                    "text": "大阪オフィス",
                    "emoji": true
                  }
                }
              ]
            }
          }
        ]
    }
}
