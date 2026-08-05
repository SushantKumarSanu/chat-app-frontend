import { socket } from "../services/socket";
import { useEffect, useRef } from "react";

function useChatRoomSync({chatlist}){
    
    const joinedChat = useRef(new Set());


    useEffect(()=>{
        if(chatlist.length===0) return;

        chatlist.forEach((chat)=>{
            if(!joinedChat.current.has(chat._id)){
            socket.emit("join chat",chat._id);
            joinedChat.current.add(chat._id);
            };
        });

    },[chatlist]);
}
export default useChatRoomSync;