import axios from "axios";
import {stringify} from "querystring";

export default async ({deleteUrl}:any)=>{
    stringify(deleteUrl)
    await axios.request({
        headers:{
            'authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`
        },
        url:deleteUrl,
        method: "POST",
        data: {
            'response_type': 'ephemeral',
            'text': '',
            'replace_original': true,
            'delete_original': true
        }
    })
        .catch(console.error)
}
