import React from "react";

import Typography from "@material-ui/core/Typography";
import {AppBar} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";

import BoardColumn from "./BoardColumn";

class Board extends React.Component {
    render() {
        return (
            <div>
                <AppBar position="static" style={{backgroundColor: "#0067A3"}}>
                    <Toolbar>
                    </Toolbar>
                </AppBar>
                <div style={{display: "flex", marginRight: "auto", marginLeft: "10px", marginTop: "10px"}}>
                    <Typography style={{color: "white", fontSize: "25px"}}> Project: Trello</Typography>
                </div>
                <div style={{display: "flex", marginTop: "20px", marginLeft: "10px"}}>
                    <BoardColumn />
                </div>
            </div>
        );
    }
}

export default Board;

