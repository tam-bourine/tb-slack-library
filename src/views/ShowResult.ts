export default({data}:any, {key}:any) => {
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
    let j = 0
    for(let i in data){
        j += 1
        blockKit.push(
            {
                "type": "context",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": `${j}件目\n:books:${data[i].name}\n:office:${data[i].place}`
                    }
                ],
            },
            {
                "type": "divider"
            }
        )
    }
    console.log(blockKit.length)
    if (blockKit.length>50 ){
        let postResult = []
        let i,j,temparray,chunk = 50;
        for (i=0,j=blockKit.length; i<j; i+=chunk) {
            temparray = blockKit.slice(i,i+chunk);
            postResult.push(temparray)
        }
        console.log("hoge")
        console.log(postResult[0])
        return postResult[0]
    }else {
        console.log("hoge!!!")
        return blockKit
    }
}
