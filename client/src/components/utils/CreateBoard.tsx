import React, {useState } from 'react'
import {Button, Dialog, TextField, Select, Card,MenuItem, DialogActions, DialogContent, DialogTitle, DialogContentText} from '@material-ui/core'
import { TwitterPicker} from 'react-color'

interface Props {
    handleClose: any,
    open: boolean
}

const CreateBoard: React.FC<Props> = ({
    handleClose, open
}) => {

    const [color, setColor] = useState("#fff")

    const handleChange = (newColor: any) => {
        setColor(newColor.hex)
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create your Board</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Add a title, a team and a color to your Board, and unleash your team's boundless productivity potential!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Board title"
                        type="email"
                        fullWidth
                    />
                    <div style={{marginTop: '20px', marginBottom: '25px', display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                        <Select
                            style={{marginRight: '40px', marginBottom: '92px'}}
                            labelId="select">
                            <MenuItem value="No team">No team</MenuItem>
                            <MenuItem value="team 1">Team 1</MenuItem>
                            <MenuItem value="Team 2">Team 2</MenuItem>
                        </Select>
                        <div style={{marginTop: '20px', marginRight: '160px', position: 'relative', display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                            <Card style={{marginBottom: '16px', marginLeft: '-235px', height: '30px', width: '30px', backgroundColor: color}}>
                            </Card>
                            <TwitterPicker 
                                style={{marginLeft: '30px'}}
                                color={color}
                                onChangeComplete={handleChange}/>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button style={{textTransform: 'none'}} onClick={handleClose} variant="contained">
                        Cancel
                    </Button>
                    <Button style={{textTransform: 'none', color: 'primary', marginRight: '18px'}} variant="contained" color="primary">
                        Create Board
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CreateBoard