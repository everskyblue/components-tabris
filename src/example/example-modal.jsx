import {
    contentView,
    Composite,
    Button,
    TextInput
} from 'tabris'

import {
    Modal,
    Toast,
} from '../modal'

function createToast(arg) {
    new Toast('mensaje enviado').show(Toast.LONG)
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

contentView.append(
    <Composite centerX centerY>
        <Button text='toast' onTap={createToast} />
        <Button text='modal' onTap={createModal} top='prev() 5' />
    </Composite>
)