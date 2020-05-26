import React from "react";
import { Dialog } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";
import EdiText from "react-editext";
import EditableLabel from "react-inline-editing";
import EditableLabelOR from "./EdiText";
import CommentExampleComment from "./Comment";

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
    font-weight: regular;
    font-size: 20px;
    border-radius: 5px;
    width: 300px;
  }
  div[editext="view-container"], div[editext="edit-container"] {
    color: #000;
    font-size: 25px;
    }
`;

const styles = (theme) => ({
    root: {
        margin: 0,
        width: '500px',
        height: '500px',
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            {children}
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default class CardDialog extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
        }
    }

    _handleFocus = (text) => {
        this.setState({edit: true});
        console.log('Focused with text: ' + text);
    }

    render() {
        return (
            <Dialog onClose={this.props.handleClose} aria-labelledby="customized-dialog-title" open={this.props.open}>
                <DialogTitle id="customized-dialog-title" onClose={this.props.handleClose}>
                    <EditableLabelOR text={this.props.title}
                                     index={this.props.index}
                                     labelClassName='myCardDialog'
                                     inputPlaceHolder='Enter list title...'
                                     inputWidth='400px'
                                     titleMarginTop='10px'
                                     inputHeight='30px'
                                     inputMaxLength='150'
                                     inputFontSize='18px'
                                     labelFontSize='18px'
                                     labelFontWeight='regular'
                                     inputFontWeight='regular'
                                     onFocus={this._handleFocus}
                                     onFocusOut={(text) => {
                                         console.log(this.props.index);
                                         this.props.editCard(text, this.props.listIndex, this.props.index);
                                         console.log('Left editor with text: ' + text);
                                     }} />
                </DialogTitle>
                <DialogActions>
                    <Button autoFocus onClick={this.props.handleClose} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>

            )
    }
}
