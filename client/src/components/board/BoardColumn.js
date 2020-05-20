import {Button, Card, IconButton, Typography} from "@material-ui/core";
import EditableLabel from "react-inline-editing";
import EditableText from "./EditableText2";
import {Draggable} from "react-beautiful-dnd";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import {TextField} from "@material-ui/core";
import EdiText from 'react-editext'
import styled from "styled-components";
import CardDialog from "./CardDialog";

const grid = 8;

const StyledEdiText = styled(EdiText)`
  button {
    border-radius: 5px;
  }
  button[editext="edit-button"] {
    color: #000;
    width: 40px;
    background: #fff;
    border: 0;
        &:hover {
      border: 1px;
      background: #f1f1f1
    }
  }
  button[editext="save-button"] {
    width: 50px;
    &:hover {
      background: greenyellow;
    }
  }
  button[editext="cancel-button"] {
    &:hover {
      background: crimson;
      color: #fff;
    }
  }
  input, textarea {
    background: #fff;
    color: #000;
    font-weight: bold;
    border-radius: 5px;
  }
  div[editext="view-container"], div[editext="edit-container"] {
    color: #000;
}
`;

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
    userSelect: "none",
    padding: 4,
    margin: `0 0 ${grid}px 0`,
    background: "F4F5F7",
    ...draggableStyle
});

export default class BoardColumn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            edit: true,
            open: false
        };
        this._handleFocus = this._handleFocus.bind(this);
        this._handleFocusOut = this._handleFocusOut.bind(this);
    }

    handleClickOpen() {
        console.log("OPEEEEEEN DIALOG")
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({
            open: false
        })
        console.log("CLOOOOOOSE DIALOG")
    };

    onSave = val => {
        console.log('Edited Value -> ', val)
    };

    _handleFocus(text) {
        this.setState({edit: true, focused: true});
        console.log('Focused with text: ' + text);
    }

    _handleFocusOut(text) {
        if (text.trim() !== "") {
            console.log("INSIDE");
            this.setState({edit: false, focused: false});
            console.log('Left editor with text: ' + text);
        }
    }

    render() {
        console.log("FUIAHFUIAPROUT");
        console.log(this.state.edit);
        return(
            <div>
            <CardDialog open={this.state.open} handleClose={this.handleClose}/>
            <Card ref={this.props.provided.innerRef}
                  style={getListStyle(this.props.snapshot.isDraggingOver)} {...this.props.provided.droppableProps}>
                <div style={{
                    marginTop: this.state.focused ? 0 : '10px',
                    marginBottom: this.state.focused ? '7px' : '15px',
                    marginLeft: '10px'
                }}>
                    <EditableLabel text=''
                                   isEditing={this.state.edit}
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
                    //console.log("TEST: ",item.id);
                    return (
                    <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={this.props.isRowDisabled}>
                        {(provided, snapshot) => (
                            <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                onClick={() => this.handleClickOpen()}
                            >
                                <Typography>{item.content}</Typography>
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
            </div>
        )
    }
}
