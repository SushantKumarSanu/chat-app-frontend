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


    return (
  <div className="shrink-0 w-full px-2 md:px-4 pb-0 pt-1 mb-1">
    <form
      onSubmit={handleMessageSubmission}
    className="flex items-center gap-1 md:gap-2 bg-surface-container-low/30 backdrop-blur-xl border border-outline-variant/20 rounded-2xl md:rounded-3xl px-2 py-1 focus-within:bg-surface-container-low/40 focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/10 transition-all duration-300 shadow-xl"
>
      <button
        type="button"
        className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-xl shrink-0 transition-all duration-300 active:scale-90"
      >
        <span className="material-symbols-outlined text-[20px]">
          add_circle
        </span>
      </button>

      <textarea
        value={message}
        onChange={handleMessageInput}
        placeholder="Type a message..."
        rows="1"
        className="w-full bg-transparent border-none outline-none focus:ring-0 text-on-surface font-body-md resize-none max-h-20 py-1 px-1 placeholder:text-on-surface-variant/40 leading-normal"
      />

      <button
        type="submit"
        disabled={sending}
        className="p-1.5 text-primary/80 hover:text-primary hover:bg-primary/10 rounded-xl shrink-0 transition-all duration-300 active:scale-90 disabled:opacity-50"
      >
        <span
          className="material-symbols-outlined text-[20px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          send
        </span>
      </button>
    </form>
  </div>
);


}


export default MessageInput; 