import {B_RequestComplete} from "../views/blocks/PurchaseRequestResult/PurchaseRequestResults";
import {PostCompleate, PostFailed} from "../Options";

export default async ({response}:any, {body}:any, {request_title}:any) => {
    if (response.status===200){
        console.log("購入依頼完了")
        let reqImage = response.data.image || "noImage"
        if (reqImage === "noImage"){
            reqImage = "http://placehold.jp/150x150.png?text=no_image"
        }
        const user_id:string = body.user.id
        let blocks = B_RequestComplete({reqTitle:request_title}, {reqImage:reqImage})
        await PostCompleate({blocks:blocks},{user_id:user_id})
    } else {
        //購入依頼が失敗した時
        console.log("購入依頼失敗")
        const user_id:string = body.user.id
        await PostFailed({user_id: user_id})
    }
}
