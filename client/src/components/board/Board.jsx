import React from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {Button, IconButton, Typography, withStyles} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import BoardColumn from "./BoardColumn";
import {LoginResponse} from "../../interfaces/requests";
import {storeString} from "../../helpers/SessionStorageHelper";
import axios from "axios";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import {useRouter} from "next/router";

const StyledButton = withStyles({
    root: {
        color: 'white',
        height: '40px',
        display: 'flex',
        textTransform: 'none',
        background: "rgba(255, 255, 255, 0.25)",
        '&:hover': {
            background: "rgba(255, 255, 255, 0.3)",
        },
    },
})(Button);

const getNewListId = (items) => {
    let i = 0;
    for (i = 0; items[i]; i++);
    return `list-${i}`
}

const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}-${new Date().getTime()}`,
        content: `Enter card title...`
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

const getItemStyleHor = (isDragging, draggableStyle) => ({
    userSelect: 'true',
    padding: 0,
    margin: `0 ${grid}px 0 0`,
    ...draggableStyle,
});

const getListStyleHor = isDraggingOver => ({
    background: 'F4F5F7',
    display: 'flex',
    padding: 0,
    overflow: 'auto',
});


export default class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            url: "",
            items: [],
            boardParams: this.props.boardParams,
            focused: false,
            isColDisabled: false,
            isRowDisabled: false,
            editingCard: false,
        };
        this.onDragEndHor = this.onDragEndHor.bind(this);
        this.addElement = this.addElement.bind(this);
    }

    updateData() {
        console.log("ID ID ID", this.state.boardParams.id, this.state.boardParams.url);
        axios.post('http://localhost:5000/' + this.state.boardParams.url + '/change_board_data', {
                json: this.state.items
            },{
            headers: {
                unique_login: this.state.boardParams.id
            }
        })
            .then(res => {
                console.log("RESPONSE", res.data)
            })
            .catch(err => {
                console.error(err)
            })
    }

    getBoard(id, url) {
        axios.post('http://localhost:5000/' + url + '/get_board_data', {
        }, {
            headers: {
                unique_login: id
            }
        })
            .then(res => {
                console.log("RESPONSE GET BOARD", res.data)
                this.setState({items: res.data.data})
            })
            .catch(err => {
                console.error(err)
            })
        this.setState({id: id, url: url});

    }

    componentDidMount() {
        const id = localStorage.getItem("id");
        const url = this.state.boardParams.url;
        console.log("ID", id);
        console.log("ID", url);
        this.getBoard(id, url)
    }

    editTitle = (text, index) => {
        const cpy = this.state.items.slice();
        console.log(cpy);
        cpy[index][2] = text;
        console.log(cpy);
        this.setState({items: cpy})
        this.updateData()
    }

    onDragStart = (result) => {
        console.log("RESULT: ", result);
        if (result.draggableId.includes("list")) {
            this.setState({isRowDisabled: true})
        } else {
            this.setState({isColDisabled: true})
        }
    }

    onDragEnd = (result) => {
        console.log("GAIOJEGIOJEAIGA3");
        const { source, destination } = result;
        console.log("SD:", source, destination);

        this.setState({isColDisabled: false, isRowDisabled: false});

        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (source.droppableId === "droppable" || destination.droppableId === "droppable" ) {
            if (source.droppableId !== "droppable" || destination.droppableId !== "droppable" ) {return;}
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
            this.updateData();
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
        this.updateData();
    }

    editCard = (title, listIndex, cardIndex) => {
        console.log("EDITCARD: ", title, listIndex, cardIndex)
        const cpy = this.state.items.slice();
        cpy[listIndex][0][cardIndex].content = title;
        console.log(cpy);
        this.setState({items: cpy})
        this.updateData();
    }

    addElement(index) {
        this.setState({editingCard: true});
        const cpy = this.state.items.slice();
        cpy[index][0] = this.state.items[index][0].concat(getItems(1, 10));
        this.setState({items: cpy});
        this.updateData();
    }

    render() {
        console.log("1: ", this.state.items);
        return (
            <div style={{fontFamily: 'Product Sans'}}>
                <div style={{display:'flex', flexDirection: 'row'}}>
                    {
                        this.state.boardParams.favorite === "true" ?
                                <StarBorderIcon style={{marginRight: '10px', height: '25px', color: 'yellow'}} />
                                :
                                <StarBorderIcon style={{marginRight: '10px', height: '25px', color: 'white'}} />
                    }
                    <Typography style={{fontWeight: 'bold', fontSize: '20px', color:'white'}}>{this.state.boardParams.title}</Typography>
                </div>
                <div style={{marginTop: '20px', display: "flex"}}>
                    <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
                        <Droppable droppableId="droppable" direction="horizontal" isDropDisabled={this.state.isColDisabled}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyleHor(snapshot.isDraggingOver)}
                                    {...provided.droppableProps}
                                >
                                    {this.state.items.map((el, ind) => {
                                        console.log("INNNNN");
                                        return (
                                            <Draggable key={el[1]} draggableId={el[1]} index={ind} isDragDisabled={this.state.isColDisabled}>
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
                                                        <Droppable key={ind} droppableId={`${ind}`} isDropDisabled={this.state.isRowDisabled}>
                                                            {(provided, snapshot) => (
                                                                <BoardColumn editingCard={this.state.editingCard} editCard={this.editCard} editTitle={this.editTitle} title={el[2]} isRowDisabled={this.state.isRowDisabled} addElement={this.addElement} items={this.state.items} snapshot={snapshot} provided={provided} element={el[0]} index={ind}/>
                                                            )}
                                                        </Droppable>
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                    <StyledButton style={{color: 'white',
                                        height: '40px',
                                        display: 'flex',
                                        textTransform: 'none',
                                        background: "rgba(255, 255, 255, 0.25)",}}
                                        onClick={() => {
                                        this.setState({items: [...this.state.items, [[], getNewListId(this.state.items), "Enter list title..."]]});
                                        this.updateData()
                                    }}>
                                        <AddIcon/>
                                        <Typography> Add another list </Typography>
                                    </StyledButton>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        );
    }
}
