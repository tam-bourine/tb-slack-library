/** @jsx JSXSlack.h */
import JSXSlack, {Divider, Input, Modal, Select, Option} from '@speee-js/jsx-slack'

export default ({name}: {name:string}) => {
    return JSXSlack(
        <Modal title='本を探す' close='キャンセル' callbackId='search_books' >
            <section>
                <p>ようこそ、{name}さん！</p>
            </section>
            <Divider/>
            <Input label='検索' type='text' blockId='search' actionId='search' placeholder='例) node.js' required/>
            <Select name='place' label='場所' placeholder='場所' actionId='place' blockId='place' required>
                <Option value='東京&大阪'>東京と大阪</Option>
                <Option value='東京'>東京</Option>
                <Option value='大阪'>大阪</Option>
            </Select>
            <input type="submit" value='検索'/>
        </Modal>
    )
}

