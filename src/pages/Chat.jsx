import { useEffect, useRef, useState } from "react";
import api from "../services/api.js";
import ChatSidebar from "../components/organisms/ChatSidebar.jsx";
import AppSidebar from "../components/organisms/AppSideBar.jsx";
import ChatWindow from "../components/organisms/ChatWindow.jsx";
import { socket } from "../services/socket.js";
import useDeliverySync from "../hooks/useDeliverySync.js";
import useReadSync from "../hooks/useReadSync.js";
import useUserActivitySync from "../hooks/useUserActivitySync.js";
import useChatRoomSync from "../hooks/useChatRoomSync.js";
import useChatInitialization from "../hooks/useChatInitialization.js";
import useMessageInitialization from "../hooks/useMessageInitialization.js";
import { updateChatOnNewMessage } from "../utils/chatHelpers.js";
import useIncomingMessageSync from "../hooks/useIncomingMessageSync.js";

function Chat({user}){
    
    const [activeChat,setActiveChat] = useState(null);
    const [chatlist,setChatlist] =useState([]);
    const [messages,setMessages] = useState([]);
    const [otherUserActivity,setotherUserActivity] = useState({});


    
    const {loading} = useChatInitialization({setChatlist , setotherUserActivity , user });
    useChatRoomSync({chatlist});
    const {messageLoading} = useMessageInitialization({ activeChat , setMessages });
    useUserActivitySync({setotherUserActivity});
    useDeliverySync({ setMessages });
    useReadSync({ setChatlist , setActiveChat });
    useIncomingMessageSync({ user ,  activeChat , setActiveChat , setMessages , setChatlist });



    return <>
    {loading?(<div className="loading">Loading...</div>):
    (
    <>
   
    <div className="bg-background text-on-background font-body-md h-screen flex overflow-hidden">
        <AppSidebar/>
        <ChatSidebar chatlist={chatlist} otherUserActivity={otherUserActivity} setChatlist={setChatlist} activeChat={activeChat} user={user} loading={loading} onSelectChat={setActiveChat}/>        
        <ChatWindow  messages={messages}otherUserActivity={otherUserActivity}  messageLoading={messageLoading} activeChat={activeChat} user={user}/>
        
    </div>
    </>)
}

    </>
}


export default Chat;
