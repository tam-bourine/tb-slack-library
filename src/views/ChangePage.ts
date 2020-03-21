export default({data}:any, {key}:any, {page}:any) => {
    let blockKit:Array<any> = []
    blockKit.push(
        {
            "type": "context",
            "elements":[
                {
                    "type": "mrkdwn",
                    "text": `:mag:　*${key}*の検索結果\n　検索結果は上位25件を表示します！！\n　多すぎる場合は検索条件を絞ってください！`
                }
            ]
        },
    )
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
            }
        )
    }
    //検索結果を10件ずつに加工
    if (blockKit.length>21 ){
        let pages = Math.floor(blockKit.length/21)+1
        let postResult:any = []
        let i,j,temparray,chunk = 21;
        for (i=0,j=blockKit.length; i<j; i+=chunk) {
            temparray = blockKit.slice(i,i+chunk);
            postResult.push(temparray)
        }
        //1ページ目の時、次へボタンのみ表示
        if (page === 1){
            postResult[page-1].push(
                {
                    "type": "context",
                    "elements":[
                        {
                            "type": "mrkdwn",
                            "text": `${pages}ページ中1ページ目を表示中`
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
                                "text": "次の10件を表示する",
                                "emoji": true
                            },
                            "style": "primary",
                            "value": "click_me_123",
                            "action_id": "nextPage"
                        },
                    ]
                }
            )
        } else if (page === pages){
            //最終ページの時、戻るボタンのみ表示
            postResult[page-1].push(
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
                                "emoji": true,
                                "text": "前の10件を表示する"
                            },
                            "style": "danger",
                            "value": "出す",
                            "action_id": "behindPage",
                        },
                    ]
                }
            )
        } else {
            //それ以外の遷移処理
            postResult[page-1].push(
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
                }
            )
        }
        return postResult[page-1]
    }else {
        return blockKit
    }
}
