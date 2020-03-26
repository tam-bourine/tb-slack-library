export default ()=>{
    const blockKit = [
        {
            "type": "context",
            "elements": [
                {
                    "type": "mrkdwn",
                    "text": ":warning:　購入依頼の送信に失敗しました！\n:disappointed_relieved:ボタンを押すとこのコメントを消すことが出来ます :paperclip:"
                }
            ]
        },
        {
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": ":disappointed_relieved:",
                        "emoji": true
                    },
                    "value": "click_me_123",
                    "action_id": "finishSearch",
                    "style": "danger"
                }
            ]
        }
    ]
    return blockKit
}
