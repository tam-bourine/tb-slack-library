// @ts-ignore
import dotenv from 'dotenv'
import {App} from '@slack/bolt'
import { SearchFormModal,ShowResult, PurchaseRequestSelect, ChangePage, PurchaseRequestModal } from "./Views";
import { DeleteMessage } from "./Options"
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
    //送信するデータをセット
    let message_ts = ""
    const search_state_value = (view.state as SearchStateValue).values
    const search_value = search_state_value.search.search.value
    const search_state = search_state_value.place.place.selected_option || {value: 'unselected'}
    const search_place = search_state.value
    ack()
    //gasで検索処理
    const url = 'https://script.google.com/macros/s/AKfycbzHHRQOvK5xjA1OVAjSU2iTUytkB83DuS__NdSkDbsYwZ2bRf4/exec'
    await axios.post(url,{
        key: search_value,
        place: search_place
    })
        //レスポンス処理
        .then(async function (response) {
            const search_result:Array<object> = response.data.result
            const url = "https://slack.com/api/chat.postEphemeral"
            const user_id = body.user.id
            //本が見つかった時
            if(search_result.length != 0){
                let blocks = ShowResult({data:search_result})
                await axios.request({
                    headers:{
                        'authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`
                    },
                    url,
                    method: "POST",
                    data: {
                        channel: "tb-slack-library",
                        text:`:mag:　*${search_value}*の検索結果\n:penguin:　${search_result.length}件の本が見つかりました！`,
                        attachments: [
                            {
                                "color": "#64B5F6",
                                "blocks": blocks
                            }
                        ],
                        user: user_id
                    }
                })
                    .catch(console.error)
                //次のページの検索結果を見る
                let page = 1
                app.action('nextPage',async ({ack,body})=>{
                    ack()
                    //前のコメントを削除
                    const deleteUrl = body.response_url
                    await DeleteMessage({deleteUrl:deleteUrl})
                    //ページの変更
                    page ++
                    blocks = ChangePage({data:search_result},{key:search_value},{page:page})
                    const url = "https://slack.com/api/chat.postEphemeral"
                    await axios.request({
                        headers:{
                            'authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`
                        },
                        url,
                        method: "POST",
                        data: {
                            channel: "tb-slack-library",
                            attachments: [
                                {
                                    "color": "#64B5F6",
                                    "blocks": blocks
                                }
                            ],
                            user: user_id
                        }
                    })
                });
                    //前のページの検索結果を見る
                app.action('behindPage',async ({ack,body})=>{
                    ack()
                    //前のコメントを削除
                    const deleteUrl = body.response_url
                    await DeleteMessage({deleteUrl:deleteUrl})
                    //ページの移動
                    page --
                    blocks = ChangePage({data:search_result},{key:search_value},{page:page})
                    await axios.request({
                        headers:{
                            'authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`
                        },
                        url,
                        method: "POST",
                        data: {
                            channel: "tb-slack-library",
                            attachments: [
                                {
                                    "color": "#64B5F6",
                                    "blocks": blocks
                                }
                            ],
                            user: user_id
                        }
                    })
                })
            }else{
                //本が見つからなかった時
                await axios.request({
                    headers:{
                        'authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`
                    },
                    url,
                    method: "POST",
                    data: {
                        channel: "tb-slack-library",
                        attachments: [
                            {
                                "color": "#F9A825",
                                "blocks": PurchaseRequestSelect(search_value),
                            }
                        ],
                        user: user_id
                    }
                })
                    .catch(console.error)
            }
        })
        .catch(console.error)
})

//購入依頼用モーダル
app.action("purchaseRequest",async ({ack,body,payload,context})=>{
    ack()
    try {
        if ("trigger_id" in body) {
            await app.client.views.open({
                token: context.botToken,
                trigger_id: body.trigger_id,
                view: PurchaseRequestModal()
            });
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
app.view("request_book",async ({ack,body,view})=>{
    ack()
    //送信するデータをセット
    const request_state_value = (view.state as RequestStateValue).values
    const request_user = body.user.name
    const request_title = request_state_value.title.title.value
    const request_place = request_state_value.place.place.selected_option.value
    const request_about = request_state_value.about.about.value
    const url = 'https://script.google.com/macros/s/AKfycbzHHRQOvK5xjA1OVAjSU2iTUytkB83DuS__NdSkDbsYwZ2bRf4/exec'
    await axios.post(url,{
        user: request_user,
        title: request_title,
        place: request_place,
        about: request_about
    }).then(async function (response) {
        if (response.status===200){
            console.log("OK")
        }
    })
})

app.action("purchaseCancel",async ({ack,body})=>{
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
