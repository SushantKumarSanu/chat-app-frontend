import SearchBox from './SearchBox.jsx';
import ChatList from './ChatList.jsx';
import SidebarHeader from './SidebarHeader.jsx';


function ChatSidebar({chatlist,user,loading,onSelectChat,activeChat,otherUserActivity,setChatlist}){


    return<>

<div className="w-full md:w-sidebar-width h-full bg-surface-container-low/80 backdrop-blur-xl border-r border-outline-variant/30 hidden md:flex flex-col shrink-0 relative z-40">
   
        <SidebarHeader user={user}/>
        <SearchBox/>
        <ChatList  chatlist={chatlist} user={user} activeChat={activeChat} onSelectChat={onSelectChat} otherUserActivity={otherUserActivity} setChatlist={setChatlist}/>
            
        </div> 
    </>
}


export default ChatSidebar;


