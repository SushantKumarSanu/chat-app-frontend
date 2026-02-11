import { useEffect, useState } from "react";
import api from "../services/api.js";
import ChatSidebar from "../components/organisms/ChatSidebar.jsx";

function Chat(){
    const [activeChat,setActiveChat] = useState(null)
    const [chatlist,setChatlist] =useState([])
    const [user,setUser] = useState(null)
    const [loading,setloading] = useState(true)


    useEffect(() => { 
        (async()=>{
        try{
            const[chatsRes,userRes] = await Promise.all([
                api.get("/api/chat/chats"),
                api.get("/api/protected/profile")
            ])
            setChatlist(chatsRes.data)
            setUser(userRes.data.user);
        }catch(error){
            console.error(error.message);
        }finally{
            setloading(false);
        }
    })();
},[]);



    return <>
    {loading?(<div className="loading">Loading...</div>):
    (
    <>
    <div className="username"><h1>{user?.username}</h1></div>

    <div className="chatpage-container">
        <ChatSidebar chatlist={chatlist} user={user} loading={loading} onSelectChat={setActiveChat}/>
        
        <div className="chat-window"><h2>{activeChat?"Chat Selected":"Select a chat"}</h2></div>
    
    </div>
    </>)
}

    </>
}


export default Chat;