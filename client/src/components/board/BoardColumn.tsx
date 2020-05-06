import React from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Button, Card} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add'
import Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import Items from './test'

class BoardColumn extends React.Component {
    render() {
        return (
            <Grid item xs={2}>
                <div className="CasesContainer">
                    <Card style={{backgroundColor: "#ebecf0"}}>
                        <Typography style={{marginBottom: "10px", fontSize: "30px"}}>Test</Typography>
                        <DndProvider backend={Backend}>
                            <Items/>
                        </DndProvider>
                        <div style={{display: "flex", flexDirection: "row", marginBottom: "5px"}}>
                            <Button color="default">
                                <AddIcon />
                                <Typography style={{marginTop: "auto", marginBottom: "auto"}}>
                                    Add Item
                                </Typography>
                            </Button>
                        </div>
                    </Card>
                </div>
            </Grid>
        );
    }
}

export default BoardColumn;

