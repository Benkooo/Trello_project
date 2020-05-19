import React from 'react'
import {
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    Card,
    CardActionArea,
    Typography,
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import TableChartIcon from '@material-ui/icons/TableChart';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import Link from 'next/link'
import {AccountCircle} from "@material-ui/icons";
import {getString} from "../../helpers/SessionStorageHelper";

import TopbarBoardList from './TopbarBoardList'
import TopbarProfile from './TopbarProfile'

interface Props {
}

const Topbar: React.FC<Props> = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [ anchorElBoard, setAnchorElBoard] = React.useState<null | HTMLElement>(null);
    const userEmail = getString("userEmail")
    console.log(userEmail)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickBoard = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElBoard(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null);
        setAnchorElBoard(null)
    };

    return (
        <div style={{flexGrow: 1}}>
            <AppBar style={{height: '43px', backgroundColor: '#366AA8'}} elevation={2} position="fixed">
                <Toolbar>
                    <Link
                        href='/home'
                    >
                        <IconButton
                            style={{marginBottom: '21px'}}
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <HomeIcon />
                        </IconButton>
                    </Link>
                    <Card style={{ backgroundColor: '#67A6CA', marginBottom: '21px', width: '250px', maxWidth: '120px', minWidth: '120px', height: '32px', justifyContent: 'center', alignItems: 'center', display: 'flex'}} >
                        <CardActionArea onClick={handleClickBoard}>
                            <div style={{color: 'white', display: 'flex', justifyContent: 'center', height: '32px', alignItems: 'center', flexDirection: 'row'}}>
                                <TableChartIcon style={{marginRight: '23px'}}/>
                                <Typography style={{fontWeight: 'bold', fontSize: '15px'}}>
                                    Boards
                                </Typography>
                            </div>
                        </CardActionArea>
                    </Card>
                    <TopbarBoardList anchorEl={anchorElBoard} handleClose={handleClose}/>

                    <Card style={{ width: '180px', minWidth: '120px', marginLeft: '5px',backgroundColor: '#67A6CA', marginBottom: '21px', position: 'relative'}}>
                        <div style={{color: 'white', marginLeft: '10px', marginBottom: '21px', height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            style={{color: 'white', marginLeft: '40px' }}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Card>
                    
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px', marginLeft: 'auto'}}>
                        <a href='/home'>
                            <img src="./logo.png"/>
                        </a>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 'auto'}}>
                        <IconButton
                            style={{marginBottom: '21px'}}
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <AddIcon />
                        </IconButton>
                        <IconButton
                            style={{marginBottom: '21px'}}
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <InfoIcon />
                        </IconButton>
                        <IconButton
                            style={{marginBottom: '21px'}}
                            edge="start"
                            color="inherit"
                            aria-label="open menu"
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <AccountCircle/>
                        </IconButton>
                        <TopbarProfile anchorEl={anchorEl} handleClose={handleClose}/>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Topbar
