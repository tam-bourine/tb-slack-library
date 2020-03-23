export default ()=>{
    const blockKit = [
        {
            "type": "context",
            "elements": [
                {
                    "type": "mrkdwn",
                    "text": ":bulb: 購入依頼はキャンセルされました！"
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
                        "text": "閉じる",
                        "emoji": true
                    },
                    "value": "click_me_123",
                    "action_id": "finishSearch"
                },
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "書籍検索へ :books:",
                        "emoji": true
                    },
                    "value": "click_me_123",
                    "action_id": "searchBooks",
                    "style":"primary"
                },
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "やっぱり購入依頼を出す :pencil:",
                        "emoji": true
                    },
                    "value": "click_me_123",
                    "action_id": "purchaseRequest",
                    "style":"primary"
                }
            ]
        }
    ]
    return blockKit
}
