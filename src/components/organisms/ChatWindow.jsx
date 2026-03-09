import { useEffect, useRef, useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import api from '../../services/api.js';
import { socket } from '../../services/socket.js';

function ChatWindow({activeChat,user,messages,messageLoading,otherUserActivity}){
    const [message,setMessage] = useState("");
    const [sending,setSending] = useState(false);
    const [isTyping,setIsTyping] = useState(false);
    const typingTimeoutRef = useRef(null);
    const otherusers =  activeChat?.users?.find(
                u=> String(u._id) !==String(user?._id)
            )||{};
    const messageEndRef = useRef(null);


    const scrollToBottom = ()=>{
        messageEndRef.current?.scrollIntoView({behavior:"smooth"});
    };

    useEffect(()=>{
        return ()=>{
            if(typingTimeoutRef.current){
                clearTimeout(typingTimeoutRef.current);
            }
        }
    },[]);


    useEffect(()=>{
        setMessage("");
    },[activeChat?._id]);

    useEffect(()=>{
        scrollToBottom();
    },[messages]);
                
    return<>
        {!(activeChat?._id)?(<div > <h2>Select a Chat</h2></div>): 
        (
        <><div className="chat-window">
            <div className="chat-title">
                <div className='avatar-wrap'>
                    <div className='avatar'>SS</div>
                    <span className="status-dot online"></span>
                </div>
                <div className='chat-header-info'>
                    <span className='name'>{otherusers?.username}</span>
                    
                    {otherUserActivity[otherusers?._id]?.typing ?
                    <span className='typing'>✎ typing...</span>
                    :
                    otherUserActivity[otherusers?._id]?.isOnline&&
                    (<span className="chat-status-text" id="chat-status-text">● Online</span>)
                    }
                </div>
            </div>
            {messageLoading?(<div className="loading">Loading...</div>):
            (<div className="message-container">
                {messages.map(msg =>{
                    const isMine = msg.sender?._id===user?._id;
                    const senderName = msg.sender?.username || "Unknown";
                    return<>
                    <div className={`bubble-wrap ${isMine?'sent-wrap':'received-wrap'}`} key={msg._id}>
                        {!isMine && <span className="bubble-sender">{senderName}</span>}
                        <div className={`bubble ${isMine?'sent':'received'}`}>
                        {msg.content}
                        <div className="bubble-footer">
                            <span className="bubble-time">{new Date(msg.createdAt).toLocaleString()}</span>
                        </div>
                        </div>
                    </div>
                       
                </>
                })}
                
                <div ref={messageEndRef}/>
                {otherUserActivity[otherusers?._id]?.typing && (<div className="typing-bubble" id="chat-typing-bubble">
                    <span></span><span></span><span></span>
                    </div>)} 
            </div>)}
    
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
                        setMessage("");


                    }catch(error){
                        console.error("Message send failed:", error.response?.data || error.message);
                    }finally{
                        setSending(false)
                    };
                }}>
                <input type="text" value={message} onChange={(e)=>{
                    setMessage(e.target.value);
                    if(!activeChat?._id) return ;
                    if(!isTyping){
                        socket.emit("typing",activeChat?._id);
                        setIsTyping(true);
                    };
                    if(typingTimeoutRef.current){
                        clearTimeout(typingTimeoutRef.current);
                    }
                    
                    typingTimeoutRef.current = setTimeout(()=>{
                        socket.emit("stop typing",activeChat?._id);
                        setIsTyping(false);
                    },2000);

                }}  />
                <button type='submit' disabled={sending}><i className="ri-send-plane-fill"></i></button>                    
                </form>

            </div>

        </>)
        }
    </>             
}


export default ChatWindow;
            // <h3 className="typing">{typingByChat[activeChat?._id] && "typing"}</h3>
            // <h2>{otherusers?.username}</h2>
