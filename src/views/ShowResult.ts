export default({data}:any, {search_place}:any) => {
    let blockKit:Array<any> = []
    if(search_place == "unselected"){
        for(let i in data){
            blockKit.push(
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "mrkdwn",
                            "text": `${parseInt(i)+1}件目\n:books:${data[i].name}\n:office:${data[i].place}`
                        }
                    ],
                },
                {
                    "type": "divider"
                },
            )
        }
    }else{
        for(let i in data){
            blockKit.push(
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "mrkdwn",
                            "text": `${parseInt(i)+1}件目\n:books:${data[i].name}`
                        }
                    ],
                },
                {
                    "type": "divider"
                },
            )
        }
    }
    
    if (blockKit.length>20 ){
        let pages = Math.floor(blockKit.length/20)+1
        let postResult:any = []
        let i,j,temparray,chunk = 20;
        for (i=0,j=blockKit.length; i<j; i+=chunk) {
            temparray = blockKit.slice(i,i+chunk);
            postResult.push(temparray)
        }
        for(let i in postResult ){
            postResult[i].push(
                {
                    "type": "context",
                    "elements":[
                        {
                            "type": "mrkdwn",
                            "text": `${pages}ページ中${parseInt(i)+1}ページ目を表示中`
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
        }
        return postResult[0]
    }else {
        blockKit.push(
            {
                "type": "context",
                "elements":[
                    {
                        "type": "mrkdwn",
                        "text": `1ページ中1ページ目を表示中`
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
        return blockKit
    }
}
