import LoginController from "../components/login/LoginController";
import {makeStyles} from "@material-ui/styles";
import {createStyles} from "@material-ui/core";


const useStyles = makeStyles(
    createStyles({
        root: {
            '& > *': {
                background: "red",
                height: "100%"
            },
        },
    }),
);

const IndexPage = () => {
    const classes = useStyles();
    return (
    <div className={classes.root}  style={{ height: "100%", textAlign: "center"}}>
        <div>
            <LoginController/>
        </div>
    </div>
    );
}



export default IndexPage;
