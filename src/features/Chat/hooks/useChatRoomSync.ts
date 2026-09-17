import { socket } from "../../../services/socket";
import { useEffect, useRef } from "react";
import { useChatStore } from "../store/chatStore";

function useChatRoomSync(){
    
    const chatList = useChatStore((state)=>state.chatList); 



    const joinedChat = useRef(new Set<string>());


    useEffect(()=>{
        if(chatList.length===0) return;

        chatList.forEach((chat)=>{
            if(!joinedChat.current.has(chat._id)){
            socket.emit("join chat",chat._id);
            joinedChat.current.add(chat._id);
            };
        });

    },[chatList]);
}
export default useChatRoomSync;