import axios from "axios";

export default async ({blocks}:any, {user_id}:any,{search_value}:any,{search_place}:any, {search_result}:any)=>{
    const url = "https://slack.com/api/chat.postEphemeral"
    if(search_place == "unselected"){
        await axios.request({
            headers:{
                'authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`
            },
            url,
            method: "POST",
            data: {
                channel: `${process.env.POST_CHANNEL_NAME}`,
                text:`:mag:　:books: ${search_value} の検索結果\n:penguin:　${search_result.length}件の本が見つかりました！`,
                attachments: [
                    {
                        "color": "#64B5F6",
                        "blocks": blocks
                    }
                ],
                user: user_id
            }
        })
        .catch(console.error)
    }else{
        await axios.request({
            headers:{
                'authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`
            },
            url,
            method: "POST",
            data: {
                channel: `${process.env.POST_CHANNEL_NAME}`,
                text:`:mag:　:books: ${search_value} :office: ${search_place} の検索結果\n:penguin:　${search_result.length}件の本が見つかりました！`,
                attachments: [
                    {
                        "color": "#64B5F6",
                        "blocks": blocks
                    }
                ],
                user: user_id
            }
        })
        .catch(console.error)
    }


}
