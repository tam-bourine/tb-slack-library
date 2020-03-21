export default ():any => {
    return{
        "type": "modal",
        "title": {
            "type": "plain_text",
            "text": "本の購入依頼 :pencil:",
            "emoji": true
        },
        "callback_id": "request_book",
        "submit": {
            "type": "plain_text",
            "text": "依頼を出す",
            "emoji": true
        },
        "close": {
            "type": "plain_text",
            "text": "キャンセル",
            "emoji": true
        },
        "blocks": [
            {
                "type": "input",
                "block_id": "title",
                "element": {
                    "type": "plain_text_input",
                    "action_id": "title",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "例) デザインとともに生きる",
                        "emoji": false
                    }
                },
                "label": {
                    "type": "plain_text",
                    "text": "本のタイトル",
                    "emoji": true
                }
            },
            {
                "type": "input",
                "block_id": "place",
                "label": {
                    "type": "plain_text",
                    "text": "オフィス",
                    "emoji": true
                },
                "element": {
                    "type": "static_select",
                    "action_id": "place",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "オフィスを選択",
                        "emoji": true
                    },
                    "options": [
                        {
                            "value": "東京",
                            "text": {
                                "type": "plain_text",
                                "text": "東京オフィス",
                                "emoji": true
                            }
                        },
                        {
                            "value": "大阪",
                            "text": {
                                "type": "plain_text",
                                "text": "大阪オフィス",
                                "emoji": true
                            }
                        }
                    ]
                }
            },
            {
                "type": "input",
                "block_id": "about",
                "element": {
                    "type": "plain_text_input",
                    "action_id": "about",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "例) 作者、出版年、参考URLなど",
                        "emoji": false
                    },
                    "multiline": true
                },
                "label": {
                    "type": "plain_text",
                    "text": "備考",
                    "emoji": true
                },
                "optional": true,
            }
        ]
    }
}
