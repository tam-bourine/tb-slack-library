export default ({pages}:any,{page}:any, {postResult}:any)=>{
    postResult.push(
        {
            "type": "context",
            "elements":[
                {
                    "type": "mrkdwn",
                    "text": `${pages}ページ中${page}ページ目を表示中`
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
                        "text": "検索を終了する",
                        "emoji": true
                    },
                    "value": "click_me_123",
                    "action_id": "finishSearch"
                },
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "検索条件を変更する",
                        "emoji": true
                    },
                    "value": "click_me_123",
                    "action_id": "searchBooks",
                    "style": "primary"
                },
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "emoji": true,
                        "text": "前の10件を表示する"
                    },
                    "style": "danger",
                    "value": "出す",
                    "action_id": "behindPage",
                },
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "次の10件を表示する",
                        "emoji": true
                    },
                    "style": "primary",
                    "value": "click_me_123",
                    "action_id": "nextPage"
                },
            ]
        },
        {
            "type": "divider"
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "探していた本は見つかりましたか？:smile:\n:pencil: 見つからない場合、購入依頼を出すことが出来ます！"
            },
            "accessory": {
                "type": "button",
                "style":"primary",
                "text": {
                    "type": "plain_text",
                    "text": "購入依頼を出す",
                    "emoji": true
                },
                "value": "click_me_123",
                "action_id": "purchaseRequest"
            }
        }
    )
    return postResult
}
