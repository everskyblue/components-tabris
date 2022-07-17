import {
    Action,
    SearchAction,
    TextView,
    contentView,
    drawer,
} from 'tabris'

import {
    NavigationView,
    NavigationDrawer,
    Page,
    ActionContainer
} from 'components-tabris'

import {pagePreference} from './example-preference'
import buttons from './example-modal'

function page2() {
    return (
        <Page title='page 2'>
            <ActionContainer>
                <Action title='page 3' onSelect={()=> { render(page3) }} />
                <SearchAction title='buscar' />
            </ActionContainer>
            <TextView text='page 2'/>
        </Page>
    )
}

function page3() {
    return (
        <Page title='page 3'>
            <TextView text='page 3'/>
        </Page>
    )
}

function render(fnpage) {
    $(NavigationView).only().append(fnpage())
}

contentView.append(<NavigationView stretch drawerActionVisible>
    <Page title='page 1'>
        <ActionContainer>
            <Action title='page 2' onSelect={()=> { render(page2) }} />
            <Action title='config' onSelect={()=> render(pagePreference)} />
        </ActionContainer>
        {buttons}
    </Page>
</NavigationView>)

drawer.set({
    enabled: true
});

drawer.append((<NavigationDrawer onLiezw={(e)=> console.log(e)}>
    <NavigationDrawer.MenuItem title='item 1' onItemSelected={()=>console.log} />
    <NavigationDrawer.Group title='social'>
        <NavigationDrawer.MenuItem title='facebook' image='/assets/images/facebook.png' onItemSelected={console.log} />
        <NavigationDrawer.MenuItem title='twitter' image='/assets/images/twitter.png' onItemSelected={console.log} />
        <NavigationDrawer.MenuItem title='youtube' image='/assets/images/youtube.png' onItemSelected={console.log} />
    </NavigationDrawer.Group>
</NavigationDrawer>
))
