import React from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {Button, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import BoardColumn from "./BoardColumn";

const getList = (nb, count, offset = 0) =>
    Array.from({length: nb}, (v, k) => k).map(k => ({
        id: `list-${nb}`,
        content: getItems(count, offset)
    }));

const getNewListId = (items) => {
    let i = 0;
    for (i = 0; items[i]; i++);
    return `list-${i}`
}

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
    console.log("GAIOJEGIOJEAIGA1");

    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    console.log("GAIOJEGIOJEAIGA2");

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
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    ...draggableStyle
});

const getItemStyleHor = (isDragging, draggableStyle) => ({
    userSelect: 'true',
    padding: grid * 2,
    margin: `0 ${grid}px 0 0`,
    ...draggableStyle,
});

const getListStyleHor = isDraggingOver => ({
    background: 'F4F5F7',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
});


export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [[getItems(10), "list-0"], [getItems(5, 10), "list-1"]],
            itemsHor: getItemsHor(5),
            focused: false
        };
        this.onDragEndHor = this.onDragEndHor.bind(this);
        this.addElement = this.addElement.bind(this);
    }

    onDragEnd = (result) => {
        console.log("GAIOJEGIOJEAIGA3");
        const { source, destination } = result;
        console.log("SD:", source, destination);

        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (source.droppableId === "droppable" || destination.droppableId === "droppable" ) {
            const cpy = this.state.items.slice();
            const tmp = cpy[source.index];
            cpy[source.index] = cpy[destination.index];
            cpy[destination.index] = tmp;
            this.setState({items: cpy});
        } else if (sInd === dInd) {
            const cpy = this.state.items.slice();
            cpy[sInd][0] = reorder(this.state.items[sInd][0], source.index, destination.index);
            console.log("LOG1: ", this.state.items[sInd][1]);
            console.log(this.state.items);
            console.log(cpy);
            this.setState({items: cpy});
        } else {
            const cpy = this.state.items.slice();
            const result = move(this.state.items[sInd][0], this.state.items[dInd][0], source, destination);
            console.log(result[sInd], result[dInd]);
            const newState = [...this.state.items[0]];
            cpy[sInd][0] = result[sInd];
            cpy[dInd][0] = result[dInd];
            console.log(newState);
            console.log(cpy);
            console.log("LOG2: ", this.state.items[sInd][0]);
            this.setState({items: cpy});
        }
    }

    onDragEndHor(result) {
        console.log("GAIOJEGIOJEAIGA");
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        const items = reorder(this.state.items[0], source.index, destination.index);
        this.setState({items: items});
    }

    addElement(index) {
        const cpy = this.state.items.slice();
        cpy[index][0] = this.state.items[index][0].concat(getItems(1, 10));
        this.setState({items: cpy});
    }

    render() {
        console.log("1: ", this.state.items);
        console.log("2: ", [getList(1, 10), getList(2, 5, 10)]);
        return (
            <div>
                <div style={{display: "flex"}}>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable" direction="horizontal">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyleHor(snapshot.isDraggingOver)}
                                    {...provided.droppableProps}
                                >
                                    {this.state.items.map((el, ind) => (
                                        <Draggable key={el[1]} draggableId={el[1]} index={ind}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyleHor(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    <Droppable key={ind} droppableId={`${ind}`}>
                                                        {(provided, snapshot) => (
                                                            <BoardColumn addElement={this.addElement} items={this.state.items} snapshot={snapshot} provided={provided} element={el[0]} index={ind}/>
                                                        )}
                                                    </Droppable>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    <Button style={{color: 'white', height: '40px', display: 'flex', textTransform: 'none'}} onClick={() => {
                                        this.setState({items: [...this.state.items, [[], getNewListId(this.state.items)]]});
                                    }}>
                                        <AddIcon/>
                                        <Typography> Add another list </Typography>
                                    </Button>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        );
    }
}
