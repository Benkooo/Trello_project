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
import EditableLabelOR from "./EdiText";

const grid = 8;

const getListStyle = isDraggingOver => ({
    background: "#ebecf0",
    padding: grid,
    width: 310,
    marginLeft: '10px',
    marginRight: '10px',
});

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
            cardFocused: false,
            edit: false,
            open: false,
            cardIndex : 0
        };
        this._handleFocus = this._handleFocus.bind(this);
        this._handleFocusList = this._handleFocusList.bind(this);
        this._handleFocusOutList = this._handleFocusOutList.bind(this);

    }

    handleClickOpen(index) {
        console.log("OPEEEEEEN DIALOG")
        this.setState({cardIndex: index, open: true});
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


    handleSave = (value) => {
        console.log(value);
        this.props.editCard(value, this.props.index, index);
    };

    _handleFocusList(text) {
        this.setState({edit: true, focused: true});
        console.log('Focused with text: ' + text);
    }

    _handleFocus(text) {
        this.setState({cardFocused: true});
        console.log('Focused with text: ' + text);
    }

    _handleFocusOutList(text) {
        if (text.trim() !== "") {
            console.log("INSIDE");
            this.setState({edit: false, focused: false});
            this.props.editTitle(text, this.props.index);
            console.log('Left editor with text: ' + text);
        }
    }

    render() {
        console.log("FUIAHFUIAPROUT");
        console.log(this.props.title);
        return(
            <div>
                {this.state.open &&
                    <CardDialog editCard={this.props.editCard} listIndex={this.props.index} title={this.props.items[this.props.index][0][this.state.cardIndex].content} index={this.state.cardIndex} open={this.state.open} handleClose={this.handleClose}/>
                }
                <Card ref={this.props.provided.innerRef}
                  style={getListStyle(this.props.snapshot.isDraggingOver)} {...this.props.provided.droppableProps}>
                <div style={{
                    marginTop: this.state.focused ? 0 : '10px',
                    marginBottom: this.state.focused ? '7px' : '15px',
                    marginLeft: '10px'
                }}>
                    <EditableLabelOR text={this.props.title}
                                   isEditing={this.state.edit}
                                   emptyEdit={true}
                                   labelClassName='myLabelClass'
                                   inputPlaceHolder='Enter list title...'
                                   inputClassName='myInputClass'
                                   inputWidth='280px'
                                   inputHeight='30px'
                                   inputMaxLength={50}
                                   inputFontSize='19px'
                                   labelFontSize='19px'
                                   labelFontWeight='regular'
                                   inputFontWeight='regular'
                                   onFocus={this._handleFocusList}
                                   onFocusOut={this._handleFocusOutList}
                    />
                </div>
                {this.props.element.map((item, index) => {
                    console.log("ITEM CONTENT: ", item.content);
                    return (
                    <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={this.props.isRowDisabled}>
                        {(provided, snapshot) => (
                            <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                onClick={() => this.handleClickOpen(index)}
                            >
                                <div style={{
                                    marginTop: this.state.cardFocused ? 0 : '10px',
                                    marginBottom: this.state.cardFocused ? 0 : '10px',
                                    marginLeft: '5px'
                                }}>
                                <EditableLabelOR text={item.content}
                                               index={index}
                                               isEditing={this.props.editingCard}
                                               labelClassName='myLabelClass'
                                               inputPlaceHolder='Enter list title...'
                                               inputWidth='290px'
                                               inputHeight='30px'
                                               inputMaxLength='150'
                                               inputFontSize='18px'
                                               labelFontSize='18px'
                                               labelFontWeight='regular'
                                               inputFontWeight='regular'
                                               onFocus={this._handleFocus}
                                               onFocusOut={(text) => {
                                                   console.log(index);
                                                   this.setState({cardFocused: false});
                                                   this.props.editCard(text, this.props.index, index);
                                                   console.log('Left editor with text: ' + text);
                                               }}
                                />
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
            </div>
        )
    }
}
