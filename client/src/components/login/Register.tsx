import {Button, CircularProgress, createStyles, Divider, Snackbar, TextField, Typography} from "@material-ui/core";
import React, {useState} from "react";
import {sha256} from "js-sha256";
import {makeStyles} from "@material-ui/styles";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import {BasicResponse} from "../../interfaces/requests";
import Router from "next/router";

// import Login from "./Login";

const useStyles = makeStyles(createStyles({
        buttonProgress: {
            position: 'absolute'
        },
        textField: {
            marginTop: "10px",
            marginBottom: "10px"
        }
    }),
);

interface Props {
    setDisplayRegister: (b: boolean) => void;
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const requestRegister = async (email: string, username: string, password: string, cPassword: string) : Promise<[boolean, string]> => {
    if (password != cPassword)
    {
        // PROBLEME
        return [false, "Passwords are not the same"];
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        username: username,
        email: email,
        password: password
    });
    try {
        const response = (await (
            await fetch("http://localhost:5000/register", {
                method: "POST",
                body: raw,
                headers
            })
        ).json()) as BasicResponse;
        return [response.success, response.message];
    } catch (error) {
        return [false, "Connection error"]
    }
};

const Register = (props: Props) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const timer = React.useRef<any>();
    const formValid = (username != "" && password != "" && cPassword != "" && email != "")
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("")

    const handleButtonClick = () => {
        if (!loading) {
            setLoading(true);
            timer.current = setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(false)
        setSuccess(false);
    };

    return (
        <div style={{ width: "40vh", margin: "20px"}}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}
            >
                <Typography variant="h6" gutterBottom style={{marginBottom: "20px", color: "grey", display: "flex", justifyContent: "center"}}>
                    Sign up for your account
                </Typography>
                {loading && <CircularProgress size={48} className={classes.buttonProgress}/>}
                <TextField
                    required
                    className={classes.textField}
                    id="emailRegister"
                    label="Enter email"
                    autoFocus
                    value={email}
                    onChange={(sender: any) => setEmail(sender.target.value)}
                />
                <TextField
                    required
                    className={classes.textField}
                    id="nameRegister"
                    label="Enter full name"
                    value={username}
                    onChange={(sender: any) => setUsername(sender.target.value)}
                />
                <TextField
                    required
                    className={classes.textField}
                    id="standard-password-input"
                    type="password"
                    label="Create password"
                    value={password}
                    onChange={(sender: any) => setPassword(sender.target.value)}
                />
                <TextField
                    required
                    className={classes.textField}
                    id="standard-confirm-password-input"
                    type="password"
                    label="Confirm password"
                    value={cPassword}
                    onChange={(sender: any) => setCPassword(sender.target.value)}
                />
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Button
                        disabled={!formValid}
                        color="primary"
                        style={{ marginTop: "20px", marginBottom: "20px", justifyContent: "center" }}
                        onClick={() => {
                            handleButtonClick();
                            requestRegister(email, username, sha256(password), sha256(cPassword)).then(function(value) {
                                if (value[0]) {
                                    setSuccess(true)
                                    Router.push("/")
                                }
                                else
                                    setError(true)
                                setMessage(value[1])
                            })
                        }}
                    >
                        Sign Up
                    </Button>
                </div>
                <Divider variant={"middle"}/>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Button
                        color="primary"
                        style={{ marginTop: "20px", fontSize: "12px"}}
                        onClick={() => props.setDisplayRegister(false)}
                    >
                        Already have an account? Log In
                    </Button>
                </div>
                <Snackbar style={{marginBottom: '900px'}} open={success} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        {message}
                    </Alert>
                </Snackbar>
                <Snackbar style={{marginBottom: '900px'}} open={error} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        {message}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
}

export default Register;