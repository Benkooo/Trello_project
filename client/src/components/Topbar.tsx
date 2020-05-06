import React from 'react'
import {AppBar, Toolbar, IconButton, InputBase, Card, CardActionArea, Typography, Avatar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import TableChartIcon from '@material-ui/icons/TableChart';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import Link from 'next/link'

interface Props {
}

const Topbar: React.FC<Props> = () => {
    
    return (
        <div style={{flexGrow: 1}}>
            <AppBar style={{height: '46px', backgroundColor: '#366AA8'}} elevation={2} position="static">
                <Toolbar>
                    <IconButton
                        style={{marginBottom: '17px'}}
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link
                        href='/boards'
                    >
                        <IconButton
                            style={{marginBottom: '17px'}}
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <HomeIcon />
                        </IconButton>
                    </Link>
                    <Card style={{ backgroundColor: '#67A6CA', marginBottom: '17px', width: '250px', maxWidth: '120px', minWidth: '120px', height: '32px', justifyContent: 'center', alignItems: 'center', display: 'flex'}} >
                        <CardActionArea >
                            <div style={{color: 'white', display: 'flex', justifyContent: 'center', height: '32px', alignItems: 'center', flexDirection: 'row'}}>
                                <TableChartIcon style={{marginRight: '23px'}}/>
                                <Typography style={{fontWeight: 'bold', fontSize: '15px'}}>
                                    Boards
                                </Typography>
                            </div>
                        </CardActionArea>
                    </Card>
                    <Card style={{ minWidth: '120px', marginLeft: '7px',backgroundColor: '#67A6CA', marginBottom: '17px', position: 'relative'}}>
                        <div style={{color: 'white', marginLeft: '10px', marginBottom: '17px', height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <SearchIcon />
                        </div>
                        <InputBase
                        style={{color: 'white', marginLeft: '40px' }}
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        />
                    </Card>

                    {/* <Card>
                        <CardActionArea>
                            <CardMedia 
                                style={{height: '110px'}}
                                image={imagePath}
                                title="logo"
                            />
                        </CardActionArea>
                    </Card>  */}

                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 'auto'}}>
                        <IconButton
                            style={{marginBottom: '17px'}}
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <AddIcon />
                        </IconButton>
                        <IconButton
                            style={{marginBottom: '17px'}}
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <InfoIcon />
                        </IconButton>
                        <IconButton
                            style={{marginBottom: '17px'}}
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <Avatar
                                style={{width: '25px', height: '25px'}}
                            />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}
  
export default Topbar