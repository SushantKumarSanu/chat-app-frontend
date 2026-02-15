import { useEffect, useRef, useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import api from '../../services/api.js';

function ChatWindow({activeChat,user,messages,messageLoading,onNewMessage}){
    const [message,setMessage] = useState("")
    const [sending,setSending] = useState(false)
    const otherusers =  activeChat?.users?.find(
                u=> u._id !==user?._id
            )||{};
    const messageEndRef = useRef(null);
    const scrollToBottom = ()=>{
        messageEndRef.current?.scrollIntoView({behavior:"smooth"});
    }

    useEffect(()=>{
        setMessage("");
    },[activeChat?._id]);

    useEffect(()=>{
        scrollToBottom();
    },[messages])
                
    return<>
        {!(activeChat?._id)?(<div > <h2>Select a Chat</h2></div>): 
        (
        <><div className="chat-window">
            <h2>{otherusers?.username}</h2>
            {messageLoading?(<div className="loading">Loading...</div>):
            (<div className="message-container">
                {messages.map(msg =>{
                    const isMine = msg.sender?._id===user?._id;
                    const senderName = msg.sender?.username || "Unknown";
                    return(
                    <div className={`message ${isMine?'my-message':'others-message'}`} key={msg._id}>
                        <h3>{msg.content}</h3>
                        <h4>{senderName}</h4>
                        <h5>{new Date(msg.createdAt).toLocaleString()}</h5>
              
                    </div>
                    )
                })}
                <div ref={messageEndRef}/>
            </div>)}
            <div className="send-message">
                <form onSubmit={async(e)=>{
                    e.preventDefault();
                    const trimmed = message.trim();
                    if (!trimmed) return;
                    setSending(true);
                    try{
                        const res = await api.post("/api/messages/messages",{
                            content:trimmed,
                            chatId:activeChat?._id 
                        });
                        onNewMessage(res.data);
                        setMessage("")


                    }catch(error){
                        console.error("Message send failed:", error.response?.data || error.message);
                    }finally{
                        setSending(false)
                    }
                }}>
                <input type="text" value={message} onChange={(e)=>{
                    setMessage(e.target.value);
                }}  />
                <button type='submit' disabled={sending}><i className="ri-send-plane-fill"></i></button>                    
                </form>

            </div>
        </div>
        </>)
        }
    </>             
}


export default ChatWindow;
