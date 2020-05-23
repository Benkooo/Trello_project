import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {List, ListItem, ListItemIcon, ListItemText, Collapse, IconButton } from '@material-ui/core'
import TableChartIcon from '@material-ui/icons/TableChart';
import TimelineIcon from '@material-ui/icons/Timeline';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';

import './CreateTeamDialog'
import CreateTeamDialog from './CreateTeamDialog';
import TeamItem from './TeamItem';

interface Props {
}

const getTeams = () => {
    axios.get('http://localhost:5000/get_teams')
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.error(err)
    })
}

const HomeList: React.FC<Props> = () => {
    const [open, setOpen] = useState(true)
    const [openTeam, setOpenTeam] = useState(false)

    useEffect(() => {

        console.log("JE RENTRE DANS LE USEEFFECT")
        getTeams()
    });

    const handleClick = () => {
        setOpen(!open)
    }

    const handleOpenTeam = () => {
        setOpenTeam(!openTeam)
    }

    const teams = ["Team 1", "Team 2", "Team 3", "Team 4"]

    return (
        <div style={{
            position: 'relative',
            top: '70px',
            left: '20px'
        }}>
            <List component="nav">
                <ListItem selected button style={{ width: '270px', height: '36px'}}>
                    <ListItemIcon>
                        <TableChartIcon style={{color: '#3b526f', height: '20px'}}/>
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ style: {fontWeight: 'bold', color: '#092b4e', fontSize: '13px'} }} primary="Boards" />
                </ListItem>
                <ListItem button style={{height: '38px'}}>
                    <ListItemIcon>
                        <TimelineIcon style={{color: '#3b526f', height: '20px'}} />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ style: {fontWeight: 'bold', color: '#092b4e' , fontSize: '13px'} }} primary="Home" />
                </ListItem>
                <ListItem button onClick={handleClick} style={{height: '38px'}}>
                    <ListItemText primaryTypographyProps={{ style: {fontWeight: 'bold', color: '#7f8da1' , fontSize: '13px'} }} primary="TEAMS" />
                    { open ? <ExpandLess style={{color: '#7f8da1', height: '20px'}} /> : <ExpandMore style={{ color: '#7f8da1', height: '20px' }} />}
                </ListItem>
                <IconButton 
                onClick={handleOpenTeam}
                style={{position: 'absolute', marginBottom: '100px', marginTop: '-42px', marginLeft: '270px'}}>
                    <AddIcon style={{color: '#7f8da1', height: '20px'}}/>
                </IconButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding style={{marginLeft: '20px'}}>
                        {teams.map((title, index) => (
                            <TeamItem key={index} title={title} index={index}/>
                        ))}
                    </List>
                </Collapse>
            </List>
            <CreateTeamDialog open={openTeam} handleClose={handleOpenTeam}/>
        </div>
    )
}

export default HomeList;