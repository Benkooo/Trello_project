import React from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {Button, Card, IconButton, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from '@material-ui/icons/Delete';

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}-${new Date().getTime()}`,
        content: `item ${k + offset}`
    }));

const getItemsHor = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `item ${k}`,
    }));

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: "F4F5F7",
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: "#ebecf0",
    padding: grid,
    width: 310,
    marginLeft: '10px',
    marginRight: '10px',
});

const getListStyleHor = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
});


export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [getItems(10), getItems(5, 10)],
            itemsHor: getItemsHor(5),
        }
        this.onDragEndHor = this.onDragEndHor.bind(this);
    }

    onDragEnd = (result) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(this.state.items[sInd], source.index, destination.index);
            const newState = [...this.state.items];
            newState[sInd] = items;
            this.setState({items: newState});
        } else {
            const result = move(this.state.items[sInd], this.state.items[dInd], source, destination);
            const newState = [...this.state.items];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];

            this.setState({items: newState.filter(group => group.length)});
        }
    }

    onDragEndHor(result) {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        const items = reorder(this.state.itemsHor, source.index, destination.index);
        this.setState({itemsHor: items});
    }

    render() {
        return (
            <div>
                <div style={{display: "flex"}}>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        {this.state.items.map((el, ind) => (
                            <Droppable key={ind} droppableId={`${ind}`}>
                                {(provided, snapshot) => (
                                    <Card ref={provided.innerRef}
                                          style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>
                                        {el.map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <Card
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                                    >
                                                        <div style={{display: "flex", justifyContent: "space-around"}}>
                                                            {item.content}
                                                            <IconButton style={{margin: '-15px'}} onClick={() => {
                                                                const newState = [...this.state.items];
                                                                newState[ind].splice(index, 1);
                                                                this.setState({items: newState.filter(group => group.length)});
                                                            }}>
                                                                <DeleteIcon/>
                                                            </IconButton>
                                                        </div>
                                                    </Card>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                        <Button style={{color: '#172B4D', display: 'flex', textTransform: 'none'}} onClick={(result) => {
                                            console.log(this.state.items[ind]);
                                            this.addElement(ind);
                                        }}>
                                            <AddIcon/>
                                            <Typography> Add another card </Typography>
                                        </Button>
                                    </Card>
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
                </div>
            </div>
        );
    }

    addElement(index) {
        const newArray = this.state.items[index].concat(getItems(1, 10));
        console.log(newArray);
        this.setState( {items: this.state.items.map((item, j) => {
            if ( j === index)
                return newArray
            else
                return item
            })
        })
    }
}
