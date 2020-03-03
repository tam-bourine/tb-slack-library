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
const run = async () => {
    await app.start(process.env.PORT || 3000)

    console.log('⚡️ Bolt app is running!')
}
run()
