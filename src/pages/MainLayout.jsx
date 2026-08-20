import { useState } from "react";
import Chat from "./chat";
import AppSidebar from "../components/organisms/AppSideBar";
import FeatureShowCase from "../components/organisms/FeatureShowCase";
import ProfilePanel from "../components/organisms/ProfilePanel";

function MainLayer({ user , setUser }){
    const [activeView,setActiveView] = useState("chat");
    const isChat = activeView === "chat";

    const viewMap = {
        "chat":()=> <Chat user={user} setUser={setUser}/>,
        "profile":()=><ProfilePanel setUser={setUser} user={user}/>
    }

    return<><div className="bg-background text-on-background font-body-md h-screen flex overflow-hidden pb-16 md:pb-0 md:pl-20">
        <AppSidebar user={user} selectView={setActiveView}/>
        {viewMap[activeView]?.()}
        {!isChat&& <FeatureShowCase/>}
        </div>
    </>
}


export default MainLayer;