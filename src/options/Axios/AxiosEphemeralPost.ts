import AxiosPost from "./AxiosPost";

export default async ({blocks}:any, {text}:any, {color}:any, {user_id}:any)=>{
    const url:string = "https://slack.com/api/chat.postEphemeral"
    const data = {
        channel: `${process.env.POST_CHANNEL_NAME}`,
        text:text,
        attachments: [
            {
                "color": color,
                "blocks": blocks
            }
        ],
        user: user_id
    }
    await AxiosPost({data:data},{url:url})
}
