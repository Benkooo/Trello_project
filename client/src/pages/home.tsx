import React from 'react'
import Topbar from '../components/Topbar'
import {makeStyles} from "@material-ui/styles";
import {createStyles} from "@material-ui/core";
import HomeList from '../components/home/HomeList';
import HomeBoard from '../components/home/HomeBoard';

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

    return (
        <div className={classes.root} >
            <Topbar />
            <div style={{minHeight: '100vh'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center'}}>
                    <div style={{ position: 'sticky', top: '0px'}}>
                        <HomeList />
                    </div>
                    <div style={{ margin: '40px 16px 0', width: '100%', maxWidth: '825px', minWidth: '288px'}}>
                        <HomeBoard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage