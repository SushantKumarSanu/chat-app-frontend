import { JSX, useState } from "react";
import Chat from "../../features/Chat/pages/Chat.jsx";
import AppSidebar from "./components/AppSidebar.jsx";
import FeatureShowCase from "./components/FeatureShowCase.jsx"
import Profile from "../../features/Profile/pages/Profile.jsx"
import Setting from "../../features/Setting/pages/Setting.jsx";

function MainLayer(){
    type view = "chat"|"profile"|"setting"
    const [activeView,setActiveView] = useState<view>("chat");
    const isChat = activeView === "chat";

    interface IViewMap{
        "chat": () => JSX.Element,
        "profile":()=>JSX.Element,
        "setting":()=>JSX.Element
    }

    const viewMap:IViewMap = {
        "chat":()=> <Chat />,
        "profile":()=><Profile/>,
        "setting": ()=><Setting />
    }

    return<><div className="bg-background text-on-background font-body-md h-screen flex overflow-hidden pb-16 md:pb-0 md:pl-20">
        <AppSidebar selectView={setActiveView}/>
        {viewMap[activeView]?.()}
        {!isChat&& <FeatureShowCase/>}
        </div>
    </>
}


export default MainLayer;