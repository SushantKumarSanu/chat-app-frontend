import { useEffect } from "react";
import { socket } from "../../../services/socket";
import { useChatStore } from "../store/chatStore";
import type { Chat } from "../types/chat.type";


function useReadSync(){

    const updateChatList = useChatStore((state)=>state.updateChatList);
    const updateActiveChat = useChatStore((state)=>state.updateActiveChat);


    useEffect(()=>{

        const handleReadReciept = ({updatedChat}:{updatedChat:Chat})=>{


            updateChatList(chatList=>
              chatList.map(chat=>
                chat._id === updatedChat._id ?
                {
                    ...chat,
                    lastRead:updatedChat.lastRead
                }
                :
                chat 
            ));


            updateActiveChat(chat=>
                chat._id=== updatedChat._id
                ?{
                    ...chat,
                    lastRead:updatedChat.lastRead
                }
                :
                chat
            );
        };

        socket.on("message read",handleReadReciept);

        return () => {
            socket.off("message read",handleReadReciept);
        }

    },[updateChatList,updateActiveChat]);

};

export default useReadSync;