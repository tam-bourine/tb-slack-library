// @ts-ignore
import dotenv from 'dotenv'
import {App} from '@slack/bolt'
import { SearchFormModal } from "./Views";

dotenv.config()

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
})

app.command('/search_book', async({ack, body, context, payload})=>{
    ack()
    const user_name:string = body.user_name
    try {
        app.client.views.open({
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
    }
}

app.view('search_books', async({ack, body, context, view})=>{
    ack()
    const search_state_value = (view.state as SearchStateValue).values
    const search_value = search_state_value.search.search.value

    await app.client.chat.postMessage({
        token: context.botToken,
        channel: 'tb-slack-library',
        text: '以下の本が見つかりました!!'
    })
})


const run = async () => {
    await app.start(process.env.PORT || 3000)

    console.log('⚡️ Bolt app is running!')
}
run()
