import React, {useState} from 'react'
import {Menu, ListItemText, Collapse, List, ListItem, TextField, Typography } from '@material-ui/core'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import BoardListItem from './BoardListItem';
import CreateBoard from '../utils/CreateBoard';

interface Props {
    anchorEl: any,
    handleClose: any,
    id: string
}

const TopbarBoardList: React.FC<Props> = ({
    anchorEl, handleClose, id
}) => {

    const [open, setOpen ] = useState(true)
    const [openPerso, setOpenPerso] = useState(true)
    const [ openCreateBoard, setOpenCreateBoard ] = useState(false)

    const handleClickOpenCreateBoard = () => {
        setOpenCreateBoard(true)
    }

    const handleCloseCreateBoard = () => {
        setOpenCreateBoard(false)
    }

    const handleClick = () => {
        setOpen(!open)
    }
    const handleClickPerso = () => {
        setOpenPerso(!openPerso)
    }

    return (
        <div>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={{ marginTop: '33px', marginLeft: '-59px'}}
            >
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' ,width: '290px'}}>
                    <TextField 
                        type="search"
                        label="Find boards by name..."
                        variant="outlined"
                        style={{width: '270px', marginBottom: '-5px'}}
                        margin="dense"
                        autoFocus
                    />
                    <div style={{width: '270px', marginTop: '10px', marginRight: 'auto', marginLeft: '10px', color: '#7f8da1', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <List component="nav">
                            <ListItem button onClick={handleClick} style={{height: '38px', borderRadius: '4px'}}>
                                <StarBorderIcon style={{marginLeft: '-11px', height: '19px'}}/>
                                <ListItemText primaryTypographyProps={{ style: {marginLeft: '7px', fontWeight: 'bold', color: '#7f8da1' , fontSize: '13px'} }} primary="STARRED BOARDS" />
                                { open ? <ExpandLess style={{marginLeft: '70px', color: '#7f8da1', height: '20px'}} /> : <ExpandMore style={{ marginLeft: '70px', color: '#7f8da1', height: '20px' }} />}
                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <BoardListItem />
                                    <BoardListItem />
                                </List>
                            </Collapse>
                            <ListItem button onClick={handleClickPerso} style={{height: '38px', borderRadius: '4px'}}>
                                <PersonOutlineIcon style={{marginLeft: '-11px', height: '19px'}}/>
                                <ListItemText primaryTypographyProps={{ style: {marginLeft: '7px', fontWeight: 'bold', color: '#7f8da1' , fontSize: '12px'} }} primary="PERSONAL BOARDS" />
                                { openPerso ? <ExpandLess style={{marginLeft: '70px', color: '#7f8da1', height: '20px'}} /> : <ExpandMore style={{ marginLeft: '70px', color: '#7f8da1', height: '20px' }} />}
                            </ListItem>
                            <Collapse in={openPerso} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <BoardListItem />
                                    <BoardListItem />
                                </List>
                            </Collapse>
                            <ListItem button onClick={handleClickOpenCreateBoard} style={{marginTop: '5px', borderRadius: '4px'}}>
                                <Typography style={{fontSize: '13px', marginLeft: '25px'}} variant="subtitle2">
                                    Create new board...
                                </Typography>
                            </ListItem>
                            <CreateBoard open={openCreateBoard} handleClose={handleCloseCreateBoard} id={id}/>
                        </List>
                    </div>
                </div>
            </Menu>
        </div>
    )
}

export default TopbarBoardList