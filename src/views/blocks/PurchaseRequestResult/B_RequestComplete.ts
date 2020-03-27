export default ({reqTitle}:any,{reqImage}:any)=>{
    const blockKit = [
        {
            "type": "context",
            "elements": [
                {
                    "type": "mrkdwn",
                    "text": ":white_check_mark:　購入依頼が完了しました！\nやったぜ！ボタンを押すとこのコメントを消すことが出来ます :paperclip:"
                }
            ]
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `${reqTitle}の購入依頼を出しました！`
            },
            "accessory": {
                "type": "image",
                "image_url": `${reqImage}`,
                "alt_text": "palm tree"
            }
        },
        {
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": ":tada: やったぜ！ :tada:",
                        "emoji": true
                    },
                    "value": "click_me_123",
                    "action_id": "finishSearch",
                    "style": "primary"
                }
            ]
        }
    ]
    return blockKit
}
