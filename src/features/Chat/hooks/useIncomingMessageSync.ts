import { useEffect, useRef, useState } from "react";
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
    
        lastMessage:{
    
            messageId:string,
    
            sender:string,
    
            content:string
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

    const recievedAttemptCounter = useRef(new Map<string,number>());

    const readAttemptCounter = useRef(new Map<string,number>());

    const sendMessageRead = (NewMessage:Message)=>{
        console.log("ack message read run");
        let currentAttempt = readAttemptCounter.current.get(NewMessage._id);
        if(currentAttempt===undefined){
            readAttemptCounter.current.set(NewMessage._id,0);
            currentAttempt = 0;
        };
        if(currentAttempt>=5){
            console.log("last ack ");
            readAttemptCounter.current.delete(NewMessage._id);
            return;
        }
        currentAttempt++;
        readAttemptCounter.current.set(NewMessage._id,currentAttempt);

        socket.timeout(5000).emit("message read",{message:NewMessage._id},
            (err:Error,response:{success:boolean,code:string})=>{
                if(err){
                    console.log("message read event ack didn't arrvie");
                    return sendMessageRead(NewMessage);
                }else if(response.success){
                    console.log("message read event succeed",response);
                    readAttemptCounter.current.delete(NewMessage._id);
                    return
                }else if(response.code==="INVALID_MESSAGE"){
                            console.log(" Invalid message id ",response);
                            readAttemptCounter.current.delete(NewMessage._id);
                        }else if(response.code==="NOT_AUTHENTICATED"){
                            console.log("Need to login again",response);
                            readAttemptCounter.current.delete(NewMessage._id);
                        }else if(response.code==="MESSAGE_NOT_FOUND"){
                            console.log("Message doesn't exists anymore.",response);
                            readAttemptCounter.current.delete(NewMessage._id);
                        }else if(response.code==="INTERNAL_ERROR"){
                            console.log("Can't process this operation right now.",response);
                            readAttemptCounter.current.delete(NewMessage._id);
                        }else if(response.code==="CHAT_NOT_FOUND"){
                            console.log("Can't process this operation right now.",response);
                            readAttemptCounter.current.delete(NewMessage._id);   
                        }
            }
        );
    }

    const sendMessageRecieved = (NewMessage:{"_id":string})=>{

        console.log("ack message  recieved run");


        let currentAttempt = recievedAttemptCounter.current.get(NewMessage._id);

        if(currentAttempt===undefined){
            recievedAttemptCounter.current.set(NewMessage._id,0);
            currentAttempt = 0 ;
        }
        if(currentAttempt>=5){
            console.log("last ack ");
            recievedAttemptCounter.current.delete(NewMessage._id);
            return; 
        };
        currentAttempt++;

        recievedAttemptCounter.current.set(NewMessage._id,currentAttempt);

        socket.timeout(5000).emit("message recieved",{message:NewMessage._id},
                    (err:Error,response:{success:boolean,code:string})=>{
                        if(err){
                            sendMessageRecieved(NewMessage);
                        }else if(response.success){
                            console.log("message receuved event done successfully",response)
                            recievedAttemptCounter.current.delete(NewMessage._id);
                        }else if(response.code==="INVALID_MESSAGE"){
                            console.log(" Invalid message id ",response);
                            recievedAttemptCounter.current.delete(NewMessage._id);
                        }else if(response.code==="NOT_AUTHENTICATED"){
                            console.log("Need to login again",response);
                            recievedAttemptCounter.current.delete(NewMessage._id);
                        }else if(response.code==="MESSAGE_NOT_FOUND"){
                            console.log("Message doesn't exists anymore.",response);
                            recievedAttemptCounter.current.delete(NewMessage._id);

                        }else if(response.code==="INTERNAL_ERROR"){
                            console.log("Can't process this operation right now.",response);
                            recievedAttemptCounter.current.delete(NewMessage._id);
                        }
                    });

    }

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
                sendMessageRecieved(NewMessage);
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

                if(newMessageSender !== userId){
                    sendMessageRead(NewMessage);
                }

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


            }
    
            
    
        }

        socket.on("new message",handleMessage);

        return () => {

            socket.off("new message",handleMessage)

        };

    },[ activeChat?._id , updateActiveChat , updateChatList , updateMessages , user?._id ]);
};

export default useIncomingMessageSync;