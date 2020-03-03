/** @jsx JSXSlack.h */
import JSXSlack, {Divider, Input, Modal} from '@speee-js/jsx-slack'

export default ({name}: {name:string}) => {
    return JSXSlack(
        <Modal title='本を探す' close='キャンセル'>
            <section>
                <p>ようこそ、{name}さん！</p>
            </section>
            <Divider/>
            <Input label='検索' type='text' blockId='search' actionId='search' placeholder='例) node.js' required/>
            <input type="submit" value='検索'/>
        </Modal>
    )
}

