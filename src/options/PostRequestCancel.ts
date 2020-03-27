import AxiosEphemeralPost from "./Axios/AxiosEphemeralPost";
import {B_RequestCancel} from "../views/blocks/PurchaseRequestResult/PurchaseRequestResults";

export default async ({user_id}:any)=>{
    let blocks = B_RequestCancel()
    const text:string = "";
    const color:string = "#90A4AE";
    await AxiosEphemeralPost({blocks:blocks}, {text:text}, {color:color}, {user_id:user_id})
}
