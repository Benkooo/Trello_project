import React from 'react'
import Topbar from '../components/Topbar'
import {makeStyles} from "@material-ui/styles";
import {createStyles} from "@material-ui/core";

const useStyles = makeStyles(
    createStyles({
        '@global': {
        body: {
            margin: 0
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
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <h1>
                    Home page
                </h1>
            </div>
        </div>
    )
}

export default HomePage