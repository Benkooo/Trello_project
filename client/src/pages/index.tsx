import LoginController from "../components/login/LoginController";
import Topbar from '../components/Topbar'
import {makeStyles} from "@material-ui/styles";
import {createStyles} from "@material-ui/core";

const useStyles = makeStyles(
    createStyles({
        '@global': {
        body: {
            margin: 0
        }
        },
        root: {
            '& > *': {
                height: "100%",
                width: "100%",
                margin: 0
            },
        },
    }),
);

const IndexPage = () => {
    const classes = useStyles();
    return (
    <div className={classes.root}  style={{ height: "100%", textAlign: "center"}}>
        <div>
            <Topbar />
            <LoginController/>
        </div>
    </div>
    );
}



export default IndexPage;
