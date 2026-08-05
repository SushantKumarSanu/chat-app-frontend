import { useEffect, useState, useRef } from "react";
import api from "../../services/api";
import { socket } from '../../services/socket.js';

function MessageInput({activeChat}){




    const [message,setMessage] = useState("");
    const [sending,setSending] = useState(false);
    const [isTyping,setIsTyping] = useState(false);

    const typingTimeoutRef = useRef(null);
    



    const handleMessageSubmission = async(e)=>{
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
    };



    const handleMessageInput = (e)=>{

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

    }



    useEffect(()=>{
        setMessage("");
    },[activeChat?._id]);



    useEffect(()=>{
        return ()=>{
            setIsTyping(false)
            if(typingTimeoutRef.current){
                clearTimeout(typingTimeoutRef.current);
            }
            socket.emit("stop typing",activeChat?._id);
        }
    },[activeChat?._id]);




    return <>
    <form onSubmit={handleMessageSubmission}>
                <input type="text" value={message} onChange={handleMessageInput}  />
                <button type='submit' disabled={sending}><i className="ri-send-plane-fill"></i></button>                    
                </form>

    </>


}


export default MessageInput; 