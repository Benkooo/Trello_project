import React, {useState, useEffect } from 'react'
import {Button, Dialog, Snackbar, TextField, Select, Card,MenuItem, DialogActions, DialogContent, DialogTitle, DialogContentText} from '@material-ui/core'
import { TwitterPicker} from 'react-color'
import Alert from '@material-ui/lab/Alert';
import axios from 'axios'

interface Props {
    handleClose: any,
    open: boolean,
    id: string
}


const CreateBoard: React.FC<Props> = ({
    handleClose, open, id, updatingBoard
}) => {

    const [color, setColor] = useState("#fff")
    const [title, setTitle] = useState('')
    const [teamList, setTeamList] = useState([])
    const [dispBar, setDispBar] = useState(false)
    const [selectedTeam, setSelectedTeam ] = useState('')
    const isEmpty = !(title) as boolean

    const handleChangeTeam = (e: any) => {
        setSelectedTeam(e.target.value)
    }

    useEffect(() => {
        axios.get('http://localhost:5000/get_teams', {
            headers: {
                unique_login: id
            }
        })
        .then(res => {
            const names = res.data.data.map(function(i: any) {
                return i.team_name
            })
            console.log("Team List in board creation : ", names)
            setTeamList(names)
        })
        .catch(err => {
            console.error(err)
        })
    }, [])

    const postBoard = () => {
        updatingBoard();
        axios.post('http://localhost:5000/add_board', {
                board_name: title,
                team_name: selectedTeam,
                bg_color: color
            }, {
                headers: {
                    unique_login: id
                }
            })
            .then(res => {
                console.log(res)
                handleClose()
                setColor('')
                setTitle('')
                if (res.data.success)
                    setDispBar(true)
            }).catch((err) => {
                console.error(err)
            })
    }

    const handleCloseBar = () => {
        setDispBar(false)
    }

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
                        value={title}
                        onChange={(e: any) => {
                            setTitle(e.target.value)
                        }}
                        type="email"
                        fullWidth
                    />
                    <div style={{marginTop: '20px', marginBottom: '25px', display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                        <Select
                            style={{marginRight: '40px', marginBottom: '92px'}}
                            labelId="select"
                            value={selectedTeam}
                            onChange={handleChangeTeam}>
                            {teamList.map((title, index) => (
                                <MenuItem key={index} value={title}>{title}</MenuItem>
                            ))}
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
                    <Button disabled={isEmpty} onClick={postBoard} style={{textTransform: 'none', color: 'primary', marginRight: '18px'}} variant="contained" color="primary">
                        Create Board
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar style={{marginBottom: '850px'}} open={dispBar} autoHideDuration={6000} onClose={handleCloseBar}>
                    <Alert onClose={handleCloseBar} severity="success">
                        Successfully created board
                    </Alert>
            </Snackbar>
        </div>
    )
}

export default CreateBoard
