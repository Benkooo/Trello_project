import React, { useEffect, useState } from 'react'
import Topbar from "../components/topbar/Topbar";
import {makeStyles} from "@material-ui/styles";
import {createStyles} from "@material-ui/core";
import HomeList from '../components/home/HomeList';
import HomeBoard from '../components/home/HomeBoard';
import {useRouter } from 'next/router'

const useStyles = makeStyles(
    createStyles({
        '@global': {
        body: {
            margin: 0,
        }
        },
        root: {
            '& > *': {
                height: "100%",
                width: "100%",
                margin: 0
            },
        },
    }),
);

const HomePage: React.FC = () => {
    const classes = useStyles()
    const router = useRouter()
    const uniqueId = router.query.id as string

    console.log("AYAYAYAYA", uniqueId)

    return (
        <div className={classes.root} >
            <Topbar id={uniqueId}/>
            <div style={{minHeight: '100vh'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center'}}>
                    <div style={{ position: 'sticky', top: '0px'}}>
                        <HomeList id={uniqueId}/>
                    </div>
                    <div style={{ margin: '40px 16px 0', width: '100%', maxWidth: '825px', minWidth: '288px'}}>
                        <HomeBoard id={uniqueId}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
