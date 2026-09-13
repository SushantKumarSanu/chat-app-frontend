import { useState } from "react";
import SettingNav from "../components/SettingNav.jsx";
import Account from "../components/Account/Account.jsx";
import SettingHeader from "../components/SettingHeader.jsx";
import SettingFooter from "../components/SettingFooter.jsx";
import type { JSX } from "react";



type SettingView = "nav"|"account"; 


function Setting(){


    const[settingView,setSettingView]= useState<SettingView>("nav");


    const viewMap:Record<SettingView,()=>JSX.Element> = {
        nav:()=><SettingNav setSettingView={setSettingView}/>,
        account:()=><Account setSettingView={setSettingView}/>,

    };


    return<><div className="w-full md:w-sidebar-width h-full bg-surface-container-low/80
            backdrop-blur-xl border-r border-outline-variant/30  md:flex flex-col  shrink-0 relative z-40">

                {/* Header */}
                <SettingHeader/>
                 <div className="flex-1 min-h-0 overflow-y-auto">
                {viewMap[settingView]()}
                </div>

                
                {settingView!=="nav"&&<SettingFooter setSettingView={setSettingView}/>}
            </div>
    </>
};

export type {SettingView}
export default Setting;


