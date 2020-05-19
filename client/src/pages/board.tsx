import React from "react";
import Typography from "@material-ui/core/Typography";
import Board from "../components/board/Board";
import Topbar from "../components/topbar/Topbar";

const BoardPage = () => {
    return (
        <div className="board">
            <div>
                <Topbar />
                <div style={{display: "flex", marginRight: "auto", marginLeft: "10px", marginTop: "10px"}}>
                    <Typography style={{color: "white", fontSize: "25px"}}> Project: Trello</Typography>
                </div>
                <div style={{display: "flex", marginTop: "20px", marginLeft: "10px"}}>
                    <Board />
                </div>
            </div>
        </div>
    );
};

export default BoardPage;
