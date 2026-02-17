import { useEffect, useState } from "react";
import api from "../services/api.js";
import ChatSidebar from "../components/organisms/ChatSidebar.jsx";
import ChatWindow from "../components/organisms/ChatWindow.jsx";
import { socket } from "../services/socket.js";

function Chat({user}){
    const [loading,setloading] = useState(true);
    const [messageLoading,setmessageLoading] = useState(false); 
    const [activeChat,setActiveChat] = useState(null);
    const [chatlist,setChatlist] =useState([]);
    const [messages,setMessages] = useState([]);
    const [typingByChat,setTypingByChat] = useState({});
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
            };
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


            };
        })();
    },[activeChat?._id]);

    useEffect(()=>{
        if(chatlist.length===0) return;
        const joined = new Set();
        chatlist.forEach((chat)=>{
            if(!joined.has(chat._id)){
            socket.emit("join chat",chat._id);
            joined.add(chat._id);
            }
        });
    },[chatlist]);

    useEffect(()=>{
        const handleMessage = (NewMessage)=>{
            if(NewMessage.chat === activeChat?._id){
                setMessages(prev=>[...prev,NewMessage]);
            }else{
                console.log("new message arrived for another chat");
            };
        };
        socket.on("new message",handleMessage);

        return () => socket.off("new message",handleMessage);
    },[activeChat?._id]);

    useEffect(()=>{
        const handleTyping = ({chatId,user})=>{
            setTypingByChat(prev=>({
                ...prev,
                [chatId]:user
            }));
        };
        const handleStopTyping = ({chatId})=>{
            setTypingByChat(prev=>{
                const copy = {...prev};
                delete copy[chatId];
                return copy;
            });
        };
        socket.on("typing",handleTyping);
        socket.on("stop typing",handleStopTyping);
        return ()=> {
            socket.off("typing",handleTyping);
            socket.off("stop typing",handleStopTyping);
        }
    },[]);

    return <>
    {loading?(<div className="loading">Loading...</div>):
    (
    <>
    <div className="username"><h1>{user?.username}</h1></div>

    <div className="chatpage-container">
        <ChatSidebar chatlist={chatlist} typingByChat={typingByChat}  user={user} loading={loading} onSelectChat={setActiveChat}/>        
        <ChatWindow  messages={messages}typingByChat={typingByChat} onNewMessage={onNewMessage} messageLoading={messageLoading} activeChat={activeChat} user={user}/>
        
    </div>
    </>)
}

    </>
}


export default Chat;