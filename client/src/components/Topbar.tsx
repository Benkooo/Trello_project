import React from 'react'
import {AppBar, Toolbar} from '@material-ui/core'

interface Props {
}

const ListItem: React.FunctionComponent<Props> = () => (
    <AppBar position="static">
        <Toolbar>
        </Toolbar>
    </AppBar>
  )
  
export default ListItem