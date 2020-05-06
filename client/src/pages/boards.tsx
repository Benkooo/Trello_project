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

const BoardsPage: React.FC = () => {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Topbar />
            <h1>
                Board page
            </h1>
        </div>
    )
}

export default BoardsPage