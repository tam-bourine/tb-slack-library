import AxiosPost from "./Axios/AxiosPost";

export default async ({deleteUrl}:any)=>{
    const data= {
        'response_type': 'ephemeral',
            'text': '',
            'replace_original': true,
            'delete_original': true
    }
    await AxiosPost({data:data}, {url:deleteUrl})
}

