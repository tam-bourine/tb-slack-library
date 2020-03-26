import AxiosPost from "./Axios/AxiosPost";

export default async ({responseUrl}:any, {blocks}:any)=>{
    const data= {
        'response_type': 'ephemeral',
        'text': '',
        'blocks': blocks
    }
    await AxiosPost({data:data}, {url:responseUrl})
}

