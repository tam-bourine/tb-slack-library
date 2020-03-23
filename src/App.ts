// @ts-ignore
import dotenv from 'dotenv'
import {App} from '@slack/bolt'
import {PurchaseRequestModal, SearchFormModal} from "./Modals"
import { ShowResult, PurchaseRequestSelect, ChangePage,Compleate, Failed, RequestCancel } from "./Views";
import { DeleteMessage,PostChangePage,PostPurchaseRequest, PostSearchResult, PostCompleate, PostFailed, PostRequestCancel } from "./Options"
import axios from 'axios';

//botトークン
dotenv.config()
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
})

//コマンドからの検索モーダル表示
app.command('/search_books', async({ack, body, context,payload})=>{
    ack()
    const user_name:string = body.user_name
    try {
        await app.client.views.open({
            token: context.botToken,
            trigger_id: payload.trigger_id,
            view: SearchFormModal({name: user_name})
        })
    }catch (error) {
        console.log(error)
    }
})
//ボタンからの検索モーダル表示
app.action("searchBooks",async ({ack,body,context})=>{
    ack()
    const user_name:string = body.user.name
    try {
        if ("trigger_id" in body) {
            await app.client.views.open({
                token: context.botToken,
                trigger_id: body.trigger_id,
                view: SearchFormModal({name:user_name})
            });
            const deleteUrl:string = body.response_url
            await DeleteMessage({deleteUrl:deleteUrl})
        }
    }catch (error) {
        console.log(error)
    }

})


//検索モーダルからのデータ
interface SearchStateValue {
    values: {
        search:{search: {value: string}}
        place:{place: {selected_option: {value: string}}}
    }
}
//検索結果の表示
app.view('search_books', async ({ack, body, view})=>{
    ack()
    const search_state_value = (view.state as SearchStateValue).values
    const search_value:string = search_state_value.search.search.value
    const search_state:{value:string} = search_state_value.place.place.selected_option || {value: 'unselected'}
    const search_place :string= search_state.value
    //送信するデータをセット
    //gasで検索処理
    const url:string = `${process.env.GAS_SPREAD_SHEET}`
    await axios.post(url,{
        key: search_value,
        place: search_place
    })
        //レスポンス処理
        .then(async function (response) {
            const search_result:Array<object> = response.data.result
            const user_id:string = body.user.id
            //本が見つかった時
            if(search_result.length != 0){
                let blocks = ShowResult({data:search_result}, {search_place:search_place})
                await PostSearchResult({blocks:blocks},{user_id:user_id},{search_value:search_value},{search_place:search_place},{search_result:search_result})
                //次のページの検索結果を見る
                let page:number = 1
                app.action('nextPage',async ({ack,body})=>{
                    ack()
                    //前のコメントを削除
                    const deleteUrl:string = body.response_url
                    await DeleteMessage({deleteUrl:deleteUrl})
                    //ページの変更
                    if (page<100000){
                        page ++
                        blocks = ChangePage({data:search_result},{key:search_value},{page:page})
                        await PostChangePage({blocks: blocks}, {user_id: user_id})
                    }
                });
                    //前のページの検索結果を見る
                app.action('behindPage',async ({ack,body})=>{
                    ack()
                    //前のコメントを削除
                    const deleteUrl:string = body.response_url
                    await DeleteMessage({deleteUrl:deleteUrl})
                    //ページの移動
                    if (page<100000){
                        page --
                        blocks = ChangePage({data:search_result},{key:search_value},{page:page})
                        await PostChangePage({blocks: blocks}, {user_id: user_id})
                    }
                })
                //検索を終了する
                app.action("finishSearch",async ({ack,body})=>{
                    ack()
                    //ページ遷移バグ回避のため(ページを削除してもデータから削除されないため、最新のコメントのみを動かす処理)
                    page = 1000000
                    const deleteUrl:string = body.response_url
                    await DeleteMessage({deleteUrl:deleteUrl})
                })
            }else{
                //本が見つからなかった時
                let blocks:Array<Object> = PurchaseRequestSelect(search_value)
                await PostPurchaseRequest({blocks:blocks},{user_id:user_id})

            }
        })
        .catch(console.error)
})

//購入依頼用モーダル
app.action("purchaseRequest",async ({ack,body,context})=>{
    ack()
    try {
        if ("trigger_id" in body) {
            await app.client.views.open({
                token: context.botToken,
                trigger_id: body.trigger_id,
                view: PurchaseRequestModal()
            });
            const deleteUrl:string = body.response_url
            await DeleteMessage({deleteUrl:deleteUrl})
        }
    }catch (error) {
        console.log(error)
    }

})

//購入依頼データ
interface RequestStateValue {
    values: {
        title:{title: {value: string}}
        place:{place: {selected_option: {value: string}}}
        about:{about: {value:string}}
    }
}

//購入依頼処理
app.view("request_book",async ({ack,body,view,payload})=>{
    ack()
    //送信するデータをセット
    const request_state_value = (view.state as RequestStateValue).values
    const request_user:string = body.user.name
    const request_title:string = request_state_value.title.title.value
    const request_place:string = request_state_value.place.place.selected_option.value
    const request_about:string = request_state_value.about.about.value
    const url:string = `${process.env.GAS_SPREAD_SHEET}`
    await axios.post(url,{
        reqUser: request_user,
        reqTitle: request_title,
        reqPlace: request_place,
        reqAbout: request_about
    }).then(async function (response) {
        ack()
        //購入依頼が完了した時
        if (response.status===200){
            console.log("購入依頼完了")
            const user_id:string = body.user.id
            let blocks = Compleate()
            await PostCompleate({blocks:blocks},{user_id:user_id})
        } else {
            //購入依頼が失敗した時
            console.log("購入依頼失敗")
            const user_id:string = body.user.id
            let blocks = Failed()
            await PostFailed({blocks: blocks}, {user_id: user_id})
        }
    }).catch(async function () {
        console.log("購入依頼失敗")
        const user_id:string = body.user.id
        let blocks = Failed()
        await PostFailed({blocks: blocks}, {user_id: user_id})
    })
})
//購入依頼がキャンセルされた時
app.view({callback_id: 'request_book', type: 'view_closed'}, async ({ body,payload, ack }) => {
    ack()
    const user_id: string = body.user.id
    let blocks = RequestCancel()
    await PostRequestCancel({blocks: blocks},{user_id: user_id})
})
//複数ページない場合はページ定義なしで終了
app.action("finishSearch",async ({ack,body})=>{
    ack()
    const deleteUrl:string = body.response_url
    await DeleteMessage({deleteUrl:deleteUrl})
})


//アプリの起動処理
const run = async () => {
    await app.start(process.env.PORT || 3000)
    console.log('⚡️ Bolt app is running!')
}
run()
