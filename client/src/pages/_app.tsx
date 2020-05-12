import { AppProps } from 'next/app'
import React from "react";
// import '../styles/global.css'
import {makeStyles} from "@material-ui/styles";
import {createStyles} from "@material-ui/core";

const useStyles = makeStyles(
    createStyles({
        '@global': {
            body: {
                margin: 0,
                background: "#CCCCCC"
            }
        },
        root: {
            '& > *': {
                height: "100%",
                width: "100%",
                margin: 0
            },
        }
    }),
);

function MyApp({ Component, pageProps }: AppProps) {
    const classes = useStyles()

    return (
        <div className={classes.root}><Component  {...pageProps} /></div>)
}

export default MyApp