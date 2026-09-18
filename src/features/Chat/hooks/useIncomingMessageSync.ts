import { useEffect } from "react";
import { socket } from "../../../services/socket";
import { updateChatOnNewMessage } from "../utils/chatHelpers";
import useUserStore from "../../../app/store/userStore";
import { useChatStore } from "../store/chatStore";
import type { Message } from "../types/message.type";

interface ReqChat{
    
        _id:string,
    
        unreadCount:number,
    
        isGroupChat:boolean,
    
        lastRead:Record<string,string>|null,
    
        users:string[],
    
        groupName?:string,
    
        groupAdmin?:string,
    
        lastMessage?:{
    
            messageId?:string,
    
            sender?:string,
    
            content?:string
        }
    
        createdAt:string,
    
        updatedAt:string
    
}

function useIncomingMessageSync(){

    const user = useUserStore((state)=>state.user);
    const activeChat = useChatStore(state=>state.activeChat);
    const updateActiveChat = useChatStore(state=>state.updateActiveChat);

    const updateMessages = useChatStore(state=>state.updateMessages);
    const updateChatList = useChatStore(state=>state.updateChatList);


    useEffect(()=>{
        if(!user) return;
        


        const handleMessage = ({message:NewMessage,chat:reqChat}:{message:Message,chat:ReqChat})=>{
            
            const userId = String(user._id);
            const newMessageSender = String(NewMessage?.sender?._id);
            const newMessageChat = String(NewMessage.chat);
            const isSender = newMessageSender === userId;

            console.log("new message handler and its NewMessage",NewMessage)
            console.log("type of reqChat:",reqChat)
            if(!isSender){
                socket.emit("message recieved",{message:NewMessage._id,user:user?._id});
            }


            if(String(reqChat?._id) === activeChat?._id){
                updateActiveChat(chat=>
                    updateChatOnNewMessage({
                        chat : chat,
                        isSender : isSender ,
                        messageId : NewMessage._id ,
                        userId : user._id ,
                        lastMessage : reqChat.lastMessage                        
                    })
                );
                // setActiveChat(prev=>

                //     updateChatOnNewMessage({
                //         chat : prev ,
                //         isSender : isSender ,
                //         messageId : NewMessage._id ,
                //         userId : user._id ,
                //         lastMessage : reqChat.lastMessage
                //     })

                // );

                // setMessages(prev=>[...prev,NewMessage]);   
                updateMessages(messages=>[...messages,NewMessage]);

                updateChatList(chatList=>{
                    return chatList.map((chat)=>{
                        if( String(chat._id)===newMessageChat ){
                            return  updateChatOnNewMessage({
                                chat:chat ,
                                isSender:isSender ,
                                messageId:NewMessage._id ,
                                userId: userId ,
                                lastMessage : reqChat.lastMessage
                            });
                        }else{
                            return chat;
                        }    

                    })
                })
                // setChatlist(prev=>{
                //     return prev.map((chat)=>{

                //         if( String(chat._id)===newMessageChat ){
                            
                //             return  updateChatOnNewMessage({
                //                         chat:chat ,
                //                         isSender:isSender ,
                //                         messageId:NewMessage._id ,
                //                         userId: userId ,
                //                         lastMessage : reqChat.lastMessage
                //                 });

                //         }else{

                //             return chat ;

                //         }
                //     })
                // });


                newMessageSender !== userId && socket.emit("message read",{message:NewMessage,user:user?._id});

            }else{

                updateChatList(chatList=>
                    chatList.map(chat=>
                        
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
            //     setChatlist(prev=>

            //         prev.map(chat=>

            //             String(chat._id) === newMessageChat
            //             ?{
            //                 ...chat,
            //                 lastMessage:{
            //                 ...chat.lastMessage,
            //                 messageId:NewMessage._id,
            //                 sender:NewMessage.sender._id,
            //                 content:NewMessage.content,
            //             },
            //             unreadCount:chat.unreadCount+1
            //         }

            //         : chat

            //     )

            // );

            }
    
            
    
        }

        socket.on("new message",handleMessage);

        return () => {

            socket.off("new message",handleMessage)

        };

    },[ activeChat?._id , updateActiveChat , updateChatList , updateMessages , user?._id ]);
};

export default useIncomingMessageSync;