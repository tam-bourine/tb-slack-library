export default(seach_value: string) => {
    var blockKit = [
        {
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": `${seach_value}の検索結果`
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
              "value": "出す"
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
    return blockKit;
}
