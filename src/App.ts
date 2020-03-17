// @ts-ignore
import dotenv from 'dotenv'
import {App} from '@slack/bolt'
import { SearchFormModal } from "./Views";
import {serialize} from "v8";
import axios from 'axios';
import {log} from "util";

dotenv.config()

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
})

app.command('/search_books', async({ack, body, context, payload})=>{
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
    const url = 'https://script.google.com/macros/s/AKfycbzHHRQOvK5xjA1OVAjSU2iTUytkB83DuS__NdSkDbsYwZ2bRf4/exec'
    console.log(url)
    await axios.post(url,{
        key: search_value,
        place: search_place
    })
        .catch(console.error)
})


const run = async () => {
    await app.start(process.env.PORT || 3000)

    console.log('⚡️ Bolt app is running!')
}
run()
