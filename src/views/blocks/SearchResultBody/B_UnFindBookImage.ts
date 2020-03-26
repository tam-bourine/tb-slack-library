export default ({i}:any, {name}:any, {place}:any, {blockKit}:any)=>{
    blockKit.push(
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `${parseInt(i)+1}件目\n:books:${name}\n:office:${place}`
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
    return blockKit
}
