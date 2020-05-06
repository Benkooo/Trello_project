import React, {useState} from 'react';
import {Button, CircularProgress, createStyles, Divider, TextField, Typography} from "@material-ui/core";
import {sha256} from "js-sha256";
import {LoginResponse} from "../../interfaces/requests";
import {makeStyles} from "@material-ui/styles";
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

const requestLogin = async (email: string, password: string) => {
    console.log(email + "    " + password);
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
            alert("ça fonctionne");
            // SUCCESS
        } else {
            alert("error")
            // ERROR
        }
    } catch (error) {
        // ERROR
        alert("error")
        console.log(error);
    }
};

const Login = (props: Props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const timer = React.useRef<any>();
    const formValid = (username != "" && password != "")

    const handleButtonClick = () => {
        if (!loading) {
            setLoading(true);
            timer.current = setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
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
                <Typography variant="h6" gutterBottom style={{marginBottom: "20px", color: "grey"}}>
                    Se connecter à EpiTrello
                </Typography>
                {loading && <CircularProgress size={48} className={classes.buttonProgress}/>}
                <TextField
                    className={classes.textField}
                    id="standard-basic"
                    label="E-mail"
                    autoFocus
                    value={username}
                    onChange={(sender: any) => setUsername(sender.target.value)}
                />
                <TextField
                    className={classes.textField}
                    id="standard-password-input"
                    type="password"
                    label="Mot de passe"
                    value={password}
                    onChange={(sender: any) => setPassword(sender.target.value)}
                />
                <div>
                    <div>
                        <Button
                            disabled={!formValid}
                            color="primary"
                            style={{ marginTop: "20px", justifyContent: "center" }}
                            onClick={() =>  {
                                handleButtonClick();
                                requestLogin(username, sha256(password))
                            }}
                        >
                            Se connecter
                        </Button>
                    </div>
                    <Divider variant={"middle"}/>
                    <div>
                        <Button
                            color="primary"
                            style={{ marginTop: "20px", fontSize: "12px"}}
                            onClick={() => props.setDisplayRegister(true)}
                        >
                            Inscivez-vous à un compte
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login