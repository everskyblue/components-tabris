import {
    Action,
    SearchAction,
    TextView,
    contentView,
    drawer
} from 'tabris'

import {
    NavigationView,
    NavigationDrawer,
    Page,
    ActionContainer
} from '../view'

function page2() {
    return (
        <Page title='page 2'>
            <ActionContainer>
                <Action title='page 3' onSelect={()=> {
                    $(NavigationView).only().append(page3())
                }} />
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

contentView.append(<NavigationView stretch drawerActionVisible>
    <Page title='my tim'>
        <ActionContainer>
            <Action title='page 2' onSelect={(e)=> {
                $(NavigationView).only().append(page2())
            }} />
        </ActionContainer>
        
        <TextView text='page 1'/>
    </Page>
</NavigationView>)

drawer.set({
    enabled: true
});

drawer.append((<NavigationDrawer onLiezw={(e)=> console.log(e)}>
    <NavigationDrawer.MenuItem title='item 1' onItemSelected={()=>console.log} />
    <NavigationDrawer.Group title='group 1'>
        <NavigationDrawer.MenuItem title='item 2' onItemSelected={console.log} />
    </NavigationDrawer.Group>
</NavigationDrawer>
))
/*
*/