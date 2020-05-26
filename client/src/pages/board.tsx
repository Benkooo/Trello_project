import React from "react";
import Typography from "@material-ui/core/Typography";
import Board from "../components/board/Board";
import Topbar from "../components/topbar/Topbar";
import {useRouter } from 'next/router'
import {makeStyles} from "@material-ui/styles";
import {createStyles} from "@material-ui/core";


const useStyles = makeStyles(
    createStyles({
        '@global': {
            body: {
                margin: 0,
                background: props => props.color
            }
        },
        root: {
            '& > *': {
                height: "100%",
                width: "100%",
                margin: 0
            },
        }
    }),
);

const BoardPage = (props: any) => {

    const router = useRouter();

    console.log("BOARDS PARAMETERS : ", router.query)
    props = router.query;
    console.log("BOARDS PARAMETERS : ", props)

    const classes = useStyles(props);
    return (
        <div className={classes.root}>
            <div>
                <Topbar id="odod"/>
                <div style={{display: "flex", marginRight: "auto", marginLeft: "10px", marginTop: "10px"}}>
                    <Typography style={{color: "white", fontSize: "25px"}}> Project: Trello</Typography>
                </div>
                <div style={{display: "flex", marginTop: "20px", marginLeft: "10px"}}>
                    <Board boardParams={props}/>
                </div>
            </div>
        </div>
    );
};

export default BoardPage;
