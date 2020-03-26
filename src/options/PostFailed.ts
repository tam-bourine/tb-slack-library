import AxiosEphemeralPost from "./Axios/AxiosEphemeralPost";

export default async ({blocks}:any, {user_id}:any)=>{
    const text:string = "";
    const color:string = "#FF3D00";
    await AxiosEphemeralPost({blocks:blocks}, {text:text}, {color:color}, {user_id:user_id})
}
