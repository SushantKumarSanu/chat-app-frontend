import SearchBox from './SearchBox.jsx';
import ChatList from './ChatList.jsx';
import SidebarHeader from './SidebarHeader.jsx';


function ChatSidebar(){


    return<>

<div className="w-full md:w-sidebar-width h-full bg-surface-container-low/80 backdrop-blur-xl border-r border-outline-variant/30 hidden md:flex flex-col shrink-0 relative z-40">
   
        <SidebarHeader/>
        <SearchBox/>
        <ChatList/>
            
        </div> 
    </>
}


export default ChatSidebar;


