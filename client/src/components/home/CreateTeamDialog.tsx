import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Snackbar} from '@material-ui/core'
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';

interface Props {
    open: boolean,
    handleClose: any,
    id: string
}


const CreateTeamDialog: React.FC<Props> = ({
    open, handleClose, id, updatingTeam
}) => {

    const [dispBar, setDispBar] = useState(false)
    const [teamName, setTeamName] = useState('')
    const [teamDescription, setTeamDescription] = useState('')
    const isEmpty = !(teamName && teamDescription) as boolean

    const postTeam = () => {
        updatingTeam();
        axios.post('http://localhost:5000/add_team', {
                team_name: teamName,
                team_members: []
            }, {
                headers: {
                    unique_login: id
                }
            })
            .then(res => {
                console.log(res)
                handleClose()
                setTeamDescription('')
                setTeamName('')
                if (res.data.success)
                    setDispBar(true)
            }).catch((err) => {
                console.error(err)
            })
    }

    const handleCloseBar = () => {
        setDispBar(false)
    }

    return (
        <div>
            <Dialog open={open} onClose={() => {
                handleClose()
                setTeamName('')
                setTeamDescription('')
            }} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Let's Build a Team</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Boost your productivity by making it easier for everyone to access boards in one location.
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Team Name"
                        fullWidth
                        variant="outlined"
                        value={teamName}
                        onChange={(e: any) => setTeamName(e.target.value)}
                        style={{marginBottom: '25px'}}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        value={teamDescription}
                        onChange={(e: any) => setTeamDescription(e.target.value)}
                        variant="outlined"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button style={{textTransform: 'none'}} onClick={() => {
                        handleClose()
                        setTeamName('')
                        setTeamDescription('')
                    }} variant="contained">
                        Cancel
                    </Button>
                    <Button disabled={isEmpty} style={{textTransform: 'none', backgroundColor: '#61BD4F', marginRight: '18px'}} onClick={postTeam} variant="contained" color="primary">
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar style={{marginBottom: '850px'}} open={dispBar} autoHideDuration={6000} onClose={handleCloseBar}>
                    <Alert onClose={handleCloseBar} severity="success">
                        Successfully created team
                    </Alert>
            </Snackbar>
        </div>
    );
}

export default CreateTeamDialog;
