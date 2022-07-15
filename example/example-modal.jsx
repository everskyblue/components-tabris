import {
    Composite,
    Button,
    TextInput,
} from 'tabris'

import {
    Modal,
    Toast,
} from '../src/modal'

function createToast(arg) {
    new Toast('toast message').show(Toast.LONG)
}
async function createModal() {
    const modal = new Modal();
    
    modal.addView(<TextInput
        left={0}
        right={0}
        message='enter value' 
        keyboard='ascii' 
    />);
    
    modal.setButtonCancel('cancel').addListener(() =>{
        modal.remove();
    })
    
    modal.setButtonAccept('accept').addListener(() =>{
        modal.remove();
    })
    
    modal.show();
}

const btns = (
    <Composite centerX centerY>
        <Button text='toast' onTap={createToast} enabled />
        <Button text='modal' onTap={createModal} top='prev() 5' />
    </Composite>
)

export default btns;