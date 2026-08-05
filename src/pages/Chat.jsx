import { useEffect, useRef, useState } from "react";
import api from "../services/api.js";
import ChatSidebar from "../components/organisms/ChatSidebar.jsx";
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


    // useEffect(()=>{
    //     const handleMessage = ({message:NewMessage,chat:reqChat})=>{
            
    //         const userId = String(user._id);
    //         const newMessageSender = String(NewMessage?.sender?._id);
    //         const newMessageChat = String(NewMessage.chat);
    //         const isSender = newMessageSender === userId;

    //         if(!isSender){
    //             socket.emit("message recieved",{message:NewMessage._id,user:user?._id});
    //         }


    //         if(String(reqChat?._id) === activeChat?._id){

    //             setActiveChat(prev=>

    //                 updateChatOnNewMessage({
    //                     chat : prev ,
    //                     isSender : isSender ,
    //                     messageId : NewMessage._id ,
    //                     userId : user._id ,
    //                     lastMessage : reqChat.lastMessage
    //                 })

    //             );

    //             setMessages(prev=>[...prev,NewMessage]);   
                
    //             setChatlist(prev=>{
    //                 return prev.map((chat)=>{

    //                     if( String(chat._id)===newMessageChat ){
                            
    //                         return  updateChatOnNewMessage({
    //                                     chat:chat ,
    //                                     isSender:isSender ,
    //                                     messageId:NewMessage._id ,
    //                                     userId: userId ,
    //                                     lastMessage : reqChat.lastMessage
    //                             });

    //                     }else{

    //                         return chat ;

    //                     }
    //                 })
    //             });


    //             newMessageSender !== userId && socket.emit("message read",{message:NewMessage,user:user?._id});

    //         }else{

    //             setChatlist(prev=>

    //                 prev.map(chat=>

    //                     String(chat._id) === newMessageChat
    //                     ?{
    //                         ...chat,
    //                         lastMessage:{
    //                         ...chat.lastMessage,
    //                         messageId:NewMessage._id,
    //                         sender:NewMessage.sender._id,
    //                         content:NewMessage.content,
    //                     },
    //                     unreadCount:chat.unreadCount+1
    //                 }

    //                 : chat

    //             )

    //         );

    //         }
    
            
    
    //     }

    //     socket.on("new message",handleMessage);

    //     return () => {

    //         socket.off("new message",handleMessage)

    //     };

    // },[activeChat?._id]);



    return <>
    {loading?(<div className="loading">Loading...</div>):
    (
    <>
    <div className="aurora-bg">
        <div className="blob1"></div>
        <div className="blob2"></div>
        <div className="blob3"></div>

    </div>
    <div className="chatpage-container">
        <ChatSidebar chatlist={chatlist} otherUserActivity={otherUserActivity} setChatlist={setChatlist}  user={user} loading={loading} onSelectChat={setActiveChat}/>        
        <ChatWindow  messages={messages}otherUserActivity={otherUserActivity}  messageLoading={messageLoading} activeChat={activeChat} user={user}/>
        
    </div>
    </>)
}

    </>
}


export default Chat;