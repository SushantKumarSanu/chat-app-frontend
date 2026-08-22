import { useState } from "react";
import Chat from "../../features/chat/pages/Chat.jsx";
// import AppSidebar from "./components/AppSidebar.jsx";
import AppSidebar from "./components/AppSidebar.jsx";
// import FeatureShowCase from "./components/FeatureShowCase.jsx";
import FeatureShowCase from "./components/FeatureShowCase.jsx"
// import Profile from "../../features/Profile/pages/Profile.js";
import Profile from "../../features/Profile/pages/Profile.jsx"

function MainLayer({ user , setUser }){
    const [activeView,setActiveView] = useState("chat");
    const isChat = activeView === "chat";

    const viewMap = {
        "chat":()=> <Chat user={user} setUser={setUser}/>,
        "profile":()=><Profile setUser={setUser} user={user}/>
    }

    return<><div className="bg-background text-on-background font-body-md h-screen flex overflow-hidden pb-16 md:pb-0 md:pl-20">
        <AppSidebar user={user} selectView={setActiveView}/>
        {viewMap[activeView]?.()}
        {!isChat&& <FeatureShowCase/>}
        </div>
    </>
}


export default MainLayer;