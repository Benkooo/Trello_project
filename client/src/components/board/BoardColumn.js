import {Button, Card, IconButton, Typography} from "@material-ui/core";
import EditableLabel from "react-inline-editing";
import {Draggable} from "react-beautiful-dnd";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import React from "react";

const grid = 8;

const getListStyle = isDraggingOver => ({
    background: "#ebecf0",
    padding: grid,
    width: 310,
    marginLeft: '10px',
    marginRight: '10px',
});

const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}-${new Date().getTime()}`,
        content: `item ${k + offset}`
    }));

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: "F4F5F7",
    ...draggableStyle
});

export default class BoardColumn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            focused: false
        };
        this._handleFocus = this._handleFocus.bind(this);
        this._handleFocusOut = this._handleFocusOut.bind(this);
    }


    _handleFocus(text) {
        this.setState({focused: true});
        console.log('Focused with text: ' + text);
    }

    _handleFocusOut(text) {
        this.setState({focused: false});
        console.log('Left editor with text: ' + text);
    }

    render() {
        console.log("FUIAHFUIAPROUT");
        for (let i = 0; this.props.element[i]; i++)
            console.log("CONTENT: ", this.props.element[i].content);
        return(
            <Card ref={this.props.provided.innerRef}
                  style={getListStyle(this.props.snapshot.isDraggingOver)} {...this.props.provided.droppableProps}>
                <div style={{
                    marginTop: this.state.focused ? 0 : '10px',
                    marginBottom: this.state.focused ? '7px' : '15px',
                    marginLeft: '10px'
                }}>
                    <EditableLabel text='Hello!'
                                   labelClassName='myLabelClass'
                                   labelPlaceHolder='Enter list title...'
                                   inputClassName='myInputClass'
                                   inputWidth='280px'
                                   inputHeight='30px'
                                   inputMaxLength={50}
                                   labelFontWeight='regular'
                                   inputFontWeight='regular'
                                   onFocus={this._handleFocus}
                                   onFocusOut={this._handleFocusOut}
                    />
                </div>
                {this.props.element.map((item, index) => {
                    console.log("TEST: ",item.id);
                    return (
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
                                        newState[this.props.index].splice(index, 1);
                                        this.setState({items: newState.filter(group => group.length)});
                                    }}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </div>
                            </Card>
                        )}
                    </Draggable>
                )})}
                {this.props.provided.placeholder}
                <Button style={{color: '#172B4D', display: 'flex', textTransform: 'none'}} onClick={(result) => {
                    console.log(this.props.items[this.props.index][0]);
                    this.props.addElement(this.props.index);
                }}>
                    <AddIcon/>
                    <Typography> Add another card </Typography>
                </Button>
            </Card>
        )
    }
}
