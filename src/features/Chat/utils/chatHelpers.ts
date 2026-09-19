import { Chat } from "../types/chat.type";

interface Args{

    chat:Chat,

    isSender:boolean,

    messageId:string,

    userId:string,
    
    lastMessage:{

        messageId:string,

        sender:string,

        content:string
    }
}

export const updateChatOnNewMessage= ({ chat , isSender , messageId , userId , lastMessage}:Args) => {
    
    const updatedChat = {
        ...chat,
        lastMessage,
    };

    if(!isSender){
        
        updatedChat.lastRead = 
        {
            ...chat.lastRead,
            [userId]:messageId

        }

    }
    
    return updatedChat;

}