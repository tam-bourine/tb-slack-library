export default() => {
    return {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "本は無いみたい！！購入依頼を出しますか？"
        },
        "blocks": [
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "emoji": true,
                            "text": "出す！"
                        },
                        "style": "primary",
                        "value": "出す！"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "emoji": true,
                            "text": "出さない"
                        },
                        "style": "danger",
                        "value": "出さない"
                    }
                ]
            }
        ]
    }
}