export default(search_value: string) => {
    const blockKit = [
        {
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": `:mag:  ${search_value}の検索結果`
				}
			]
		},
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "本は無いみたい:cry: 購入依頼を出しますか？"
              }
        },
        {
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "emoji": true,
                        "text": "出す"
                    },
                    "style": "primary",
                    "value": "出す",
                    "action_id": "purchaseRequest"
                },
                {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "emoji": true,
                    "text": "出さない"
                },
                "style": "danger",
                "value": "出さない",
                    "action_id": "purchaseCancel"
                }
            ]
        }
    ]
    return blockKit;
}
