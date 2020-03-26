export default({data}:any, {key}:any, {page}:any) => {
    let blockKit:Array<any> = []
    for(let i in data){
        if (data[i].image){
            //画像があった時
            blockKit.push(
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `${parseInt(i)+1}件目\n:books:${data[i].name}\n:office:${data[i].place}`
                    },
                    "accessory": {
                        "type": "image",
                        "image_url": `${data[i].image}`,
                        "alt_text": "palm tree"
                    }
                },
                {
                    "type": "divider"
                }
            )
        }else{
            blockKit.push(
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `${parseInt(i)+1}件目\n:books:${data[i].name}\n:office:${data[i].place}`
                    },
                    "accessory": {
                        "type": "image",
                        "image_url": "http://placehold.jp/150x150.png?text=no_image",
                        "alt_text": "palm tree"
                    }
                },
                {
                    "type": "divider"
                }
            )
        }
    }
    //ブロックが20個以上あったときの処理
    const splitNum:number = 20
    if (blockKit.length>splitNum ){
        let pages = Math.floor(blockKit.length/splitNum)+1
        let postResult:any = []
        let i,j,temparray,chunk = splitNum;
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
                                "emoji": true,
                                "text": "前の10件を表示する"
                            },
                            "style": "danger",
                            "value": "出す",
                            "action_id": "behindPage",
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
        }
        return postResult[page-1]
    }else {
        return blockKit
    }
}
