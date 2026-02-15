import { useEffect, useState } from "react";
import api from "../services/api.js";
import { socket } from "../services/socket.js";
import ChatSidebar from "../components/organisms/ChatSidebar.jsx";
import ChatWindow from "../components/organisms/ChatWindow.jsx";

function Chat({user}){
    const [loading,setloading] = useState(true)
    const [messageLoading,setmessageLoading] = useState(false) 
    const [activeChat,setActiveChat] = useState(null)
    const [chatlist,setChatlist] =useState([])
    const [messages,setMessages] = useState([])
    const onNewMessage = (newMsg)=>{
        setMessages(prev=>[...prev,newMsg]);
    };

    useEffect(() => { 
        (async()=>{
            try{
                const chatsRes = await api.get("/api/chat/chats")
                setChatlist(chatsRes.data)
            }catch(error){
                console.error(error.message);
            }finally{
                setloading(false);
            }
        })();
    },[]);


    useEffect(()=>{
        if(!activeChat?._id) return;
        setmessageLoading(true);

          
        (async()=>{
            try{
                const messages = await api.get(`/api/messages/messages/${activeChat?._id}`);
                setMessages([...messages.data].reverse());
            }catch(error){
                console.error(error.message);
                console.error(error.stack);
            }finally{
             
            setmessageLoading(false);


            }
        })();
    },[activeChat?._id]);


 
    return <>
    {loading?(<div className="loading">Loading...</div>):
    (
    <>
    <div className="username"><h1>{user?.username}</h1></div>

    <div className="chatpage-container">
        <ChatSidebar chatlist={chatlist} user={user} loading={loading} onSelectChat={setActiveChat}/>        
        <ChatWindow  messages={messages} onNewMessage={onNewMessage} messageLoading={messageLoading} activeChat={activeChat} user={user}/>
        
    </div>
    </>)
}

    </>
}


export default Chat;