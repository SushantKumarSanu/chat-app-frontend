import SearchBox from './SearchBox.jsx';
import ChatList from './ChatList.jsx';
import SidebarHeader from './SidebarHeader.jsx';


function ChatSidebar({chatlist,user,loading,onSelectChat,otherUserActivity,setChatlist}){


    return<>

    <div className="sidebar">
        
        <SidebarHeader user={user}/>
        <SearchBox/>
        <ChatList  chatlist={chatlist} user={user} onSelectChat={onSelectChat} otherUserActivity={otherUserActivity} setChatlist={setChatlist}/>
            
        </div> 
    </>
}


export default ChatSidebar;


