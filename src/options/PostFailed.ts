import axios from "axios";

export default async ({blocks}:any, {user_id}:any)=>{
    const url = "https://slack.com/api/chat.postEphemeral"
    await axios.request({
        headers:{
            'authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`
        },
        url,
        method: "POST",
        data: {
            channel: `${process.env.POST_CHANNEL_NAME}`,
            text:"",
            attachments: [
                {
                    "color": "#FF3D00",
                    "blocks": blocks
                }
            ],
            user: user_id
        }
    })
        .catch(console.error)
}
