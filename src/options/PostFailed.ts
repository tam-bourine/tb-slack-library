import AxiosEphemeralPost from "./Axios/AxiosEphemeralPost";
import {B_RequestFailed} from "../views/blocks/PurchaseRequestResult/PurchaseRequestResults";

export default async ({user_id}:any)=>{
    let blocks = B_RequestFailed()
    const text:string = "";
    const color:string = "#FF3D00";
    await AxiosEphemeralPost({blocks:blocks}, {text:text}, {color:color}, {user_id:user_id})
}
