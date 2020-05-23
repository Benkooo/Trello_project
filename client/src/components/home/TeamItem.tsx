import React, {useState} from 'react'
import {ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import GroupIcon from '@material-ui/icons/Group';

interface Props {
    index: number,
    title: string
}

const TeamItem: React.FC<Props> = ({title, index}) => {

    const [select, setSelect] = useState(false)

    return (
        <ListItem onClick={() => setSelect(true)} button key={index} style={{height: '38px'}}>
            <ListItemIcon>
                <GroupIcon style={{color: '#3b526f', height: '20px'}}/>
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ style: {fontWeight: 'bold', color: '#092b4e', fontSize: '13px'} }} primary={title} />
        </ListItem >
    )
}

export default TeamItem;