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
    id: string,
    color: string,
    board: boolean
}

const Topbar: React.FC<Props> = ({id, color, board}) => {
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

    const hexToRGB = (hex: string) => {
        console.log(hex)
        hex = '0x' + hex
        let r = hex >> 16 & 0xFF
        let g = hex >> 8 & 0xFF
        let b = hex & 0xFF
        console.log(`rgb(${r}, ${g}, ${b})`)
        console.log(`rgb(${r - 10}, ${g - 10}, ${b - 10})`)
        return `rgb(${r - 20}, ${g - 20}, ${b - 20})`
    }

    const hexToRGBButton = (hex: string) => {
        console.log(hex)
        hex = '0x' + hex
        let r = hex >> 16 & 0xFF
        let g = hex >> 8 & 0xFF
        let b = hex & 0xFF
        console.log(`rgb(${r}, ${g}, ${b})`)
        console.log(`rgb(${r + 100}, ${g + 20}, ${b - 20})`)
        return `rgb(${r + 100}, ${g + 20}, ${b - 20})`
    }

    return (
        <div style={{flexGrow: 1}}>
            <AppBar style={{height: '43px', backgroundColor: board ? hexToRGB(color.substr(1)) : '#366AA8'}} elevation={2} position="fixed">
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
                    <Card style={{ backgroundColor: board ? hexToRGBButton(color.substr(1)) : '#67A6CA', marginBottom: '21px', width: '250px', maxWidth: '120px', minWidth: '120px', height: '32px', justifyContent: 'center', alignItems: 'center', display: 'flex'}} >
                        <CardActionArea onClick={handleClickBoard}>
                            <div style={{color: 'white', display: 'flex', justifyContent: 'center', height: '32px', alignItems: 'center', flexDirection: 'row'}}>
                                <TableChartIcon style={{marginRight: '23px'}}/>
                                <Typography style={{fontWeight: 'bold', fontSize: '15px'}}>
                                    Boards
                                </Typography>
                            </div>
                        </CardActionArea>
                    </Card>
                    <TopbarBoardList id={id} anchorEl={anchorElBoard} handleClose={handleClose}/>

                    <Card style={{ width: '180px', minWidth: '120px', marginLeft: '5px',backgroundColor: board ? hexToRGBButton(color.substr(1)) : '#67A6CA', marginBottom: '21px', position: 'relative'}}>
                        <div style={{color: 'white', marginLeft: '10px', marginBottom: '21px', height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            style={{color: 'white', marginLeft: '40px' }}
                            placeholder="Search…"
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
