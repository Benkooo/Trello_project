import {DragDropContext, Droppable} from "react-beautiful-dnd";
import BoardColumn from "./BoardColumn";
import {Button, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";

<DragDropContext onDragEnd={this.onDragEnd}>
    {this.state.items.map((el, ind) => (
        <Droppable key={ind} droppableId={`${ind}`}>
            {(provided, snapshot) => (
                <BoardColumn snapshot={snapshot} provided={provided} element={el} index={ind}/>
            )}
        </Droppable>
    ))}
    <Button style={{color: 'white', height: '40px', display: 'flex', textTransform: 'none'}} onClick={() => {
        this.setState({items: [...this.state.items, []]});
    }}>
        <AddIcon/>
        <Typography> Add another list </Typography>
    </Button>
</DragDropContext>
