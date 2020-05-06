import {Button, CircularProgress, createStyles, Divider, TextField, Typography} from "@material-ui/core";
import React, {useState} from "react";
import {RegisterResponse} from "../../interfaces/requests";
import {sha256} from "js-sha256";
import {makeStyles} from "@material-ui/styles";

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

const requestRegister = async (email: string, username: string, password: string, cPassword: string) => {
    if (email === "" || username === "" || password === "" || cPassword === "" || password != cPassword)
    {
        // PROBLEME
        return;
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    console.log("OK")
    const raw = JSON.stringify({
        username: username,
        email: email,
        password: password
    });
    try {
        console.log("YESS")
        console.log(raw)
        const response = (await (
            await fetch("http://localhost:5000/register", {
                method: "POST",
                body: raw,
                headers
            })
        ).json()) as RegisterResponse;
        console.log(raw)
        console.log(response)
        if (response.success) {
            alert("ça fonctionne");
            // SUCCESS
        } else {
            alert("error connection")
            // ERROR
        }
    } catch (error) {
        // ERROR;
        alert("error")
        console.log(error);
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
                    justifyContent: "space-between"
                }}
            >
                <Typography variant="h6" gutterBottom style={{marginBottom: "20px", color: "grey"}}>
                    Inscivez-vous à un compte
                </Typography>
                {loading && <CircularProgress size={48} className={classes.buttonProgress}/>}
                <TextField
                    required
                    className={classes.textField}
                    id="emailRegister"
                    label="E-mail"
                    autoFocus
                    value={email}
                    onChange={(sender: any) => setEmail(sender.target.value)}
                />
                <TextField
                    required
                    className={classes.textField}
                    id="nameRegister"
                    label="Nom complet"
                    value={username}
                    onChange={(sender: any) => setUsername(sender.target.value)}
                />
                <TextField
                    required
                    className={classes.textField}
                    id="standard-password-input"
                    type="password"
                    label="Mot de passe"
                    value={password}
                    onChange={(sender: any) => setPassword(sender.target.value)}
                />
                <TextField
                    required
                    className={classes.textField}
                    id="standard-password-input"
                    type="password"
                    label="Confirmer le mot de passe"
                    value={cPassword}
                    onChange={(sender: any) => setCPassword(sender.target.value)}
                />
                <div>
                    <Button
                        disabled={!formValid}
                        color="primary"
                        style={{ marginTop: "20px", justifyContent: "center" }}
                        onClick={() => {
                            handleButtonClick();
                            requestRegister(email, username, sha256(password), sha256(cPassword));
                        }}
                    >
                        S'inscrire
                    </Button>
                </div>
                <Divider variant={"middle"}/>
                <div>
                    <Button
                        color="primary"
                        style={{ marginTop: "20px", fontSize: "12px"}}
                        onClick={() => props.setDisplayRegister(false)}
                    >
                        Vous avez déja un compte ? Connectez vous
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Register;