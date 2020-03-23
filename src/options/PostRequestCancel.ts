import axios from "axios";

export default async ({blocks}:any, {user_id}:any)=>{
    const url:string = "https://slack.com/api/chat.postEphemeral"
    await axios.request({
        headers:{
            'authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`
        },
        url,
        method: "POST",
        data: {
            channel: "tb-slack-library",
            text:"",
            attachments: [
                {
                    "color": "#90A4AE",
                    "blocks": blocks
                }
            ],
            user: user_id
        }
    })
        .catch(console.error)
}
