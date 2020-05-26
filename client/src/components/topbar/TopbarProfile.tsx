import React from 'react'
import {Menu, MenuItem, Typography, Divider} from '@material-ui/core'
import {getString} from "../../helpers/SessionStorageHelper";
import {LoginResponse} from "../../interfaces/requests";
import Router from "next/router";

interface Props {
    anchorEl: any,
    handleClose: any
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

const TopbarProfile: React.FC<Props> = ({
    anchorEl, handleClose
}) => {

    const userEmail = getString("userEmail")
    console.log(userEmail)

    return (
        <div>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={{marginTop: '33px'}}
            >
                {userEmail === null &&
                <Typography variant="h6" gutterBottom style={{margin: "10px", color: "grey", display: "flex", justifyContent: "center"}}>
                    Informations
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
                }}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <Divider variant={"middle"} style={{marginTop: "5px", marginBottom: "5px"}}/>
                <MenuItem onClick={() => {
                    handleClose();
                    logout();
                }}>Logout</MenuItem>
            </Menu>
        </div>
    )
}

export default TopbarProfile