import React from 'react'
import {
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    Card,
    CardActionArea,
    Typography,
    Menu,
    MenuItem,
    Divider
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import TableChartIcon from '@material-ui/icons/TableChart';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import Link from 'next/link'
import {AccountCircle} from "@material-ui/icons";
import {LoginResponse} from "../interfaces/requests";
import Router from "next/router";
import {getString} from "../helpers/SessionStorageHelper";

interface Props {
}

const logout = async () => {
    try {
        const response = (await (
            await fetch("http://localhost:5000/logout", {
                method: "POST",
                redirect: "follow"
            })
        ).json()) as LoginResponse;
        if (response.success) {
            // SUCCESS
            await Router.push("/")
        } else {
            // ERROR
            alert(response.message)
        }
    } catch (error) {
        // ERROR
        alert("error")
        console.log(error);
    }
}

const Topbar: React.FC<Props> = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const userEmail = getString("userEmail")
    console.log(userEmail)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                        href='/home'
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
                            aria-label="open menu"
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <AccountCircle/>
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {userEmail === null &&
                            <Typography variant="h6" gutterBottom style={{margin: "10px", color: "grey", display: "flex", justifyContent: "center"}}>
                                Informations du compte
                            </Typography>
                            }
                            { userEmail !== null &&
                            <Typography variant="h6" gutterBottom style={{margin: "10px", color: "grey", display: "flex", justifyContent: "center"}}>
                                {userEmail}
                            </Typography>
                            }
                            <Divider variant={"middle"} style={{marginTop: "5px", marginBottom: "5px"}}/>

                            <MenuItem onClick={() => {
                                handleClose();
                                Router.push('/profile');
                            }}>Profil</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <Divider variant={"middle"} style={{marginTop: "5px", marginBottom: "5px"}}/>
                            <MenuItem onClick={() => {
                                handleClose();
                                logout();
                            }}>Se déconnecter</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Topbar