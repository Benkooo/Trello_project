import Topbar from "../components/topbar/Topbar";
import React from "react";


const ProfilePage = () => {
    return (
        <div style={{ height: "100%", textAlign: "center"}}>
            <div>
                <Topbar id="coco"/>
                <ProfileController/>
            </div>
        </div>
    );
}

export default ProfilePage;
