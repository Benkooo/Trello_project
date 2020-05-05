import React, {useState} from 'react';
import {Button, TextField, Typography} from "@material-ui/core";
import {sha256} from "js-sha256";
import {LoginResponse} from "../../interfaces/requests";

interface Props {
    setDisplayRegister: (b: boolean) => void;
}

const requestLogin = async (username: string, password: string) => {
    console.log("TEST")
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        username: username,
        password: password
    });
    try {
        var response = (await (
            await fetch("http://localhost:8080/login", {
                method: "POST",
                body: raw,
                headers,
                redirect: "follow"
            })
        ).json()) as LoginResponse;
        if (response.success) {
            // SUCCESS
        } else {
            // ERROR
        }
    } catch (error) {
        // ERROR
        console.log(error);
    }
};

const Login = (props: Props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div style={{ width: "100vh" }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Login
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
                    style={{ marginTop: "40px" }}
                    value={password}
                    onChange={(sender: any) => setPassword(sender.target.value)}
                />
                <div>
                    <Button
                        color="primary"
                        style={{ marginTop: "40px", justifyContent: "center" }}
                        onClick={() => requestLogin(username, sha256(password))}
                    >
                        Login
                    </Button>
                    <div>
                        <Button
                            color="primary"
                            style={{ marginTop: "10px" }}
                            onClick={() => props.setDisplayRegister(true)}
                        >
                            Register >
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login