import { useEffect } from "react";
import { socket } from "../services/socket";
import { updateChatOnNewMessage } from "../utils/chatHelpers";

function useIncomingMessageSync({ user ,  activeChat , setActiveChat , setMessages , setChatlist }){
    
    useEffect(()=>{
        const handleMessage = ({message:NewMessage,chat:reqChat})=>{
            
            const userId = String(user._id);
            const newMessageSender = String(NewMessage?.sender?._id);
            const newMessageChat = String(NewMessage.chat);
            const isSender = newMessageSender === userId;

            if(!isSender){
                socket.emit("message recieved",{message:NewMessage._id,user:user?._id});
            }


            if(String(reqChat?._id) === activeChat?._id){

                setActiveChat(prev=>

                    updateChatOnNewMessage({
                        chat : prev ,
                        isSender : isSender ,
                        messageId : NewMessage._id ,
                        userId : user._id ,
                        lastMessage : reqChat.lastMessage
                    })

                );

                setMessages(prev=>[...prev,NewMessage]);   
                
                setChatlist(prev=>{
                    return prev.map((chat)=>{

                        if( String(chat._id)===newMessageChat ){
                            
                            return  updateChatOnNewMessage({
                                        chat:chat ,
                                        isSender:isSender ,
                                        messageId:NewMessage._id ,
                                        userId: userId ,
                                        lastMessage : reqChat.lastMessage
                                });

                        }else{

                            return chat ;

                        }
                    })
                });


                newMessageSender !== userId && socket.emit("message read",{message:NewMessage,user:user?._id});

            }else{

                setChatlist(prev=>

                    prev.map(chat=>

                        String(chat._id) === newMessageChat
                        ?{
                            ...chat,
                            lastMessage:{
                            ...chat.lastMessage,
                            messageId:NewMessage._id,
                            sender:NewMessage.sender._id,
                            content:NewMessage.content,
                        },
                        unreadCount:chat.unreadCount+1
                    }

                    : chat

                )

            );

            }
    
            
    
        }

        socket.on("new message",handleMessage);

        return () => {

            socket.off("new message",handleMessage)

        };

    },[ activeChat?._id , setActiveChat , setChatlist , setMessages ]);
};

export default useIncomingMessageSync;