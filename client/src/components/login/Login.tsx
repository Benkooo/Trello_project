import React, {useState} from 'react';
import {Button, CircularProgress, createStyles, Divider, Snackbar, TextField, Typography} from "@material-ui/core";
import {sha256} from "js-sha256";
import {LoginResponse} from "../../interfaces/requests";
import {makeStyles} from "@material-ui/styles";
import Router from "next/router";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {storeString} from "../../helpers/SessionStorageHelper";
// import Register from "./Register";

// import {green} from "@material-ui/core/colors";

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

export const requestLogin = async (email: string, password: string) : Promise<[boolean, string, string]> => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        email: email,
        password: password
    });
    try {
        const response = (await (
            await fetch("http://localhost:5000/login", {
                method: "POST",
                body: raw,
                headers,
                redirect: "follow"
            })
        ).json()) as LoginResponse;
        if (response.success) {
            console.log("LA REPONSE: ", response)
            storeString("userEmail", email);
            return [response.success, response.message, response.unique_login];
        } else {
            return [response.success, response.message, ""];
        }
    } catch (error) {
        // ERROR
        return [false, "Connection error", ""]
    }
};

const Login = (props: Props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const timer = React.useRef<any>();
    const formValid = (username != "" && password != "")
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
                    justifyContent: "space-between",
                }}
            >
                <Typography variant="h6" gutterBottom style={{color: "grey", display: "flex", justifyContent: "center"}}>
                    Connect to your account
                </Typography>
                {loading && <CircularProgress size={48} className={classes.buttonProgress}/>}
                <TextField
                    className={classes.textField}
                    id="standard-basic"
                    label="Username"
                    autoFocus
                    value={username}
                    onChange={(sender: any) => setUsername(sender.target.value)}
                />
                <TextField
                    className={classes.textField}
                    id="standard-password-input"
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(sender: any) => setPassword(sender.target.value)}
                />
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Button
                        disabled={!formValid}
                        color="primary"
                        style={{ marginTop: "20px", marginBottom: "20px"}}
                        onClick={() =>  {
                            handleButtonClick();
                            requestLogin(username, sha256(password)).then(function(value) {
                                if (value[0]) {
                                    setSuccess(true)
                                    Router.push({
                                        pathname: '/home',
                                        query: { id: value[2]}
                                    })
                                }
                                else
                                    setError(true)
                                setMessage(value[1])
                            })
                        }}
                    >
                        Log in
                    </Button>
                </div>
                <Divider variant={"middle"}/>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Button
                        color="primary"
                        style={{ marginTop: "20px", fontSize: "12px"}}
                        onClick={() => props.setDisplayRegister(true)}
                    >
                        Not registered yet ?
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
};

export default Login