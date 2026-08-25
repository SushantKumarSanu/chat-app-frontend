import { useState } from "react";
import SettingNav from "../components/SettingNav.jsx";
import AccountDetails from "../components/AccountDetails.jsx/AccountDetails.jsx";
import SettingHeader from "../components/SettingHeader.jsx";
import UpdatePassword from "../components/UpdatePassword/UpdatePassword.jsx";

function Setting({ setUser, user}){
    const[settingView,setSettingView]= useState("nav");


    const viewMap = {
        nav:()=><SettingNav setSettingView={setSettingView}/>,
        account:()=><AccountDetails user={user} setSettingView={setSettingView}/>,
        updatePassword:()=><UpdatePassword setSettingView={setSettingView}/>,
        privacy:()=>{}
    } 



    return<><div className="w-full md:w-sidebar-width h-full bg-surface-container-low/80
            backdrop-blur-xl border-r border-outline-variant/30  md:flex flex-col shrink-0 relative z-40">

                {/* Header */}
                <SettingHeader settingView={settingView}/>
                {viewMap[settingView]?.()}
            </div>
    </>
};


export default Setting;


