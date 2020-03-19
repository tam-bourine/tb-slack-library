export default({data}:any) => {
    let blockKit = []
    blockKit.push(
    {
        "type": "context",
        "elements":[
            {
                "type": "mrkdwn",
                "text": "の検索結果"
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
                        "text": ":books: " + data[i].name + "\n" + ":office: " + data[i].place
                    }
                ],
            },
            {
                "type": "divider"
            }
        )
    }
    console.log(blockKit)
    return blockKit
}
