import Login from './Login'
import Register from "./Register";
import {useState} from "react";
import {Card} from "@material-ui/core";

const LoginController = () => {
    const [displayRegister, setDisplayRegister] = useState(false);

    return (
        <div>
            <div style={{flexDirection: 'column', display: "flex", alignItems: 'center', justifyContent: "center", marginTop: "170px"}}>
                <div style={{marginTop: '-60px', marginBottom: '50px'}}>
                    <img src="./loginlogo.png" />
                </div>
                <Card>
                    {!displayRegister && (
                        <Login setDisplayRegister={setDisplayRegister} />
                    )}
                    {displayRegister && (
                        <Register setDisplayRegister={setDisplayRegister} />
                    )}
                </Card>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '120px'}}>
                <img style={{marginRight: 'auto'}} src="leftImage.png" />
                <img style={{marginRight: '20px', marginTop: '-30px'}} src="rightImage.png"/>
            </div>
        {/*<div>*/}
        {/*    <div style={{display: "flex", justifyContent: "center", marginTop: "170px"}}>*/}
        {/*        <Card>*/}
        {/*            {!displayRegister && (*/}
        {/*                <Login setDisplayRegister={setDisplayRegister} />*/}
        {/*            )}*/}
        {/*            {displayRegister && (*/}
        {/*                <Register setDisplayRegister={setDisplayRegister} />*/}
        {/*            )}*/}
        {/*        </Card>*/}
        {/*    </div>*/}
        {/*    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "baseline"}}>*/}
        {/*        <div>*/}
        {/*            <img src={"/left_login_image.png"}/>*/}
        {/*        </div>*/}
        {/*        <div>*/}
        {/*            <img src={"/right_login_image.png"}/>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        </div>
    );
}

export default LoginController;