import axios from "axios";

export default async ({data}:any, {url}:any)=>{
    await axios.request({
        headers:{
            'authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`
        },
        url,
        method: "POST",
        data: data
    })
        .catch(console.error)
}
