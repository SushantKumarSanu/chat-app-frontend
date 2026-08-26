import { useState } from "react";
import SettingNav from "../components/SettingNav.jsx";
import Account from "../components/Account/Account.jsx";
import SettingHeader from "../components/SettingHeader.jsx";
import AccountDetails from "../components/Account/AccountDetails/AccountDetails.jsx"
import UpdatePassword from "../components/Account/UpdatePassword/UpdatePassword.jsx";
import SettingFooter from "../components/SettingFooter.jsx";
function Setting({ setUser, user}){
    const[settingView,setSettingView]= useState("nav");


    const viewMap = {
        nav:()=><SettingNav setSettingView={setSettingView}/>,
        account:()=><Account user={user} setSettingView={setSettingView}/>,
        // account:()=><AccountDetails user={user} setSettingView={setSettingView}/>,
        updatePassword:()=><UpdatePassword setSettingView={setSettingView}/>,
    } 



    return<><div className="w-full md:w-sidebar-width h-full bg-surface-container-low/80
            backdrop-blur-xl border-r border-outline-variant/30  md:flex flex-col  shrink-0 relative z-40">

                {/* Header */}
                <SettingHeader settingView={settingView}/>
                 <div className="flex-1 min-h-0 overflow-y-auto">
                {viewMap[settingView]?.()}
                </div>

                
                {settingView!=="nav"&&<SettingFooter setSettingView={setSettingView}/>}
            </div>
    </>
};


export default Setting;


