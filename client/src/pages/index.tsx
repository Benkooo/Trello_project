import LoginController from "../components/login/LoginController";
import Topbar from '../components/Topbar'
// import {makeStyles} from "@material-ui/styles";
// import {createStyles} from "@material-ui/core";

// const useStyles = makeStyles(
//     createStyles({
//         '@global': {
//         body: {
//             margin: 0,
//             background: "#CCCCCC"
//         }
//         },
//         root: {
//             '& > *': {
//                 height: "100%",
//                 width: "100%",
//                 margin: 0,
//             },
//         },
//     }),
// );

const IndexPage = () => {
    return (
        <div>
            <div>
                <Topbar />
                <LoginController/>
            </div>
        </div>
    );
}

export default IndexPage;
