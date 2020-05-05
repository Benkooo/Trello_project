import {Button, TextField, Typography} from "@material-ui/core";
import React, {useState} from "react";
import {RegisterResponse} from "../../interfaces/requests";
import {sha256} from "js-sha256";


interface Props {
    setDisplayRegister: (b: boolean) => void;
}

const requestRegister = async (username: string, password: string, cPassword: string) => {
    if (username === "" || password === "" || cPassword === "" || password != cPassword)
    {
        // PROBLEME
        return;
    }
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        username: username,
        password: password
    });
    try {
        const response = (await (
            await fetch("http://localhost:8080/register", {
                method: "POST",
                body: raw,
                headers
            })
        ).json()) as RegisterResponse;
        if (response.success) {
            // SUCCESS;
        } else {
            // ERROR;
        }
    } catch (error) {
        // ERROR;
        console.log(error);
    }
};

const Register = (props: Props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");

    return (
        <div style={{width: "100vh"}}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Register
                </Typography>
                <TextField
                    id="standard-basic"
                    label="Username or email"
                    autoFocus
                    value={username}
                    onChange={(sender: any) => setUsername(sender.target.value)}
                />
                <TextField
                    id="standard-password-input"
                    type="password"
                    label="Password"
                    style={{marginTop: "40px"}}
                    value={password}
                    onChange={(sender: any) => setPassword(sender.target.value)}
                />
                <TextField
                    id="standard-password-input"
                    type="password"
                    label="Password"
                    style={{marginTop: "40px"}}
                    value={cPassword}
                    onChange={(sender: any) => setCPassword(sender.target.value)}
                />
                <div>
                    <Button
                        color="primary"
                        style={{ marginTop: "40px", justifyContent: "center" }}
                        onClick={() => {
                            requestRegister(username, sha256(password), sha256(cPassword));
                            props.setDisplayRegister(false);
                        }}
                    >
                        Register
                    </Button>
                    <div>
                        <Button
                            color="primary"
                            style={{ marginTop: "10px" }}
                            onClick={() => props.setDisplayRegister(false)}
                        >
                            {"<"} Back to login
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;