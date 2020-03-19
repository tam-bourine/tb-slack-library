// @ts-ignore
import dotenv from 'dotenv'
import {App} from '@slack/bolt'
import { SearchFormModal,ShowResult, PurchaseRequestSelect } from "./Views";
import axios from 'axios';


dotenv.config()
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
})



app.command('/search_book', async({ack, body, context, payload})=>{
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

interface SearchStateValue {
    values: {
        search:{search: {value: string}}
        place:{place: {selected_option: {value: string}}}
    }
}

app.view('search_books', async({ack, body, context, view})=>{
    ack()
    const search_state_value = (view.state as SearchStateValue).values
    const search_value = search_state_value.search.search.value
    const search_state = search_state_value.place.place.selected_option || {value: 'unselected'}
    const search_place = search_state.value
    ack()
    const url = 'https://script.google.com/macros/s/AKfycbwTVf3hLKDR9s-QXEIesfdLp0swgzBYFHpDjRh6huKhFLBUEzE/exec'
    console.log(url)
    await axios.post(url,{
        key: search_value,
        place: search_place
    })
        .then(async function (response) {
            const search_result:Array<object> = response.data.result
            const url = "https://slack.com/api/chat.postMessage"
            console.log(search_result)
            if(search_result.length != 0){
                const result = await axios.request({
                    headers:{
                        'authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`
                    },
                    url,
                    method: "POST",
                    data: {
                        channel: "tb-slack-library",
                        blocks: ShowResult({data:search_result},{key:search_value})
                    }
                })
                    .catch(console.error)
                console.log(result)
            }else{
                const result = await axios.request({
                    headers:{
                        'authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`
                    },
                    url,
                    method: "POST",
                    data: {
                        channel: "tb-slack-library",
                        blocks: PurchaseRequestSelect(search_value)
                    }
                })
                    .catch(console.error)
                console.log(result)
            }
        })
        .catch(console.error)

})



const run = async () => {
    await app.start(process.env.PORT || 3000)
    console.log('⚡️ Bolt app is running!')
}
run()
