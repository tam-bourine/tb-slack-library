import AxiosEphemeralPost from "./Axios/AxiosEphemeralPost";
export default async ({blocks}:any, {user_id}:any,{search_value}:any,{search_place}:any, {search_result}:any)=>{
    if(search_place == "unselected"){
        //オフィスが選ばれている時
        const text:string = `:mag:　:books: ${search_value} の検索結果\n:penguin:　${search_result.length}件の本が見つかりました！`
        const color:string = "#64B5F6";
        await AxiosEphemeralPost({blocks:blocks}, {text:text}, {color:color}, {user_id:user_id})
    }else{
        //オフィスが選ばれていない時
        const text:string = `:mag:　:books: ${search_value} :office: ${search_place} の検索結果\n:penguin:　${search_result.length}件の本が見つかりました！`
        const color:string = "#64B5F6";
        await AxiosEphemeralPost({blocks:blocks}, {text:text}, {color:color}, {user_id:user_id})
    }
}
