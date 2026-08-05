

export const updateChatOnNewMessage= ({ chat , isSender , messageId , userId , lastMessage}) => {
    
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