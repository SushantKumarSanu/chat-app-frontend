import { useEffect, useRef, useState } from "react";
import api from "../services/api.js";
import ChatSidebar from "../components/organisms/ChatSidebar.jsx";
import ChatWindow from "../components/organisms/ChatWindow.jsx";
import { socket } from "../services/socket.js";

function Chat({user}){
    const [loading,setloading] = useState(true);
    const joinedChat = useRef(new Set());
    const [messageLoading,setmessageLoading] = useState(false); 
    const [activeChat,setActiveChat] = useState(null);
    const [chatlist,setChatlist] =useState([]);
    const [messages,setMessages] = useState([]);
    const [otherUserActivity,setotherUserActivity] = useState({});


    useEffect(() => { 
        (async()=>{
            try{
                const usersInitalActvivties = {}
                const chatsRes = await api.get("/api/chat/chats")
                setChatlist(chatsRes.data);
                console.log(chatsRes.data)

                chatsRes.data.forEach(chat => {
                const otherusers = chat.users.find(
                u=> String(u._id) !==String(user?._id)
                )||{};
                if(otherusers?._id){
                    usersInitalActvivties[otherusers._id] = {
                        isOnline:otherusers.isOnline,
                        typing:false
                    }
                }
                });
                setotherUserActivity(usersInitalActvivties);

            }catch(error){
                console.error(error.message);
            }finally{
                setloading(false);
            };
        })();
    },[]);




    useEffect(()=>{
        if(!activeChat?._id) return;
        setmessageLoading(true);          
        (async()=>{
            try{
                const messages = await api.get(`/api/messages/messages/${activeChat?._id}`);
                setMessages([...messages.data].reverse());
            }catch(error){
                console.error(error.message);
                console.error(error.stack);
            }finally{
             
            setmessageLoading(false);


            };
        })();
    },[activeChat?._id]);

    useEffect(()=>{
        if(chatlist.length===0) return;

        chatlist.forEach((chat)=>{
            if(!joinedChat.current.has(chat._id)){
            socket.emit("join chat",chat._id);
            joinedChat.current.add(chat._id);
            };
        });     
    },[chatlist]);

    useEffect(()=>{
        const handleMessage = (NewMessage)=>{
            if(NewMessage.chat === activeChat?._id){
                let copyActiveChat = {...activeChat};
                let updatedLastRead = {...activeChat.lastRead};
                let updatedLastMessage = 
                {...activeChat.lastMessage,
                    messageId:NewMessage._id,
                    sender:NewMessage.sender._id,
                    content:NewMessage.content,
                    readBy:[],
                };
                if(String(NewMessage.sender._id)===String(user._id)){
                    updatedLastRead[user._id] = NewMessage._id;
                }else{
                        updatedLastRead[user._id] = NewMessage._id;
                        updatedLastRead[NewMessage.sender._id] = NewMessage._id;
                }
                copyActiveChat.lastRead = updatedLastRead;
                copyActiveChat.lastMessage = updatedLastMessage;
                setActiveChat(copyActiveChat);
                setMessages(prev=>[...prev,NewMessage]);
                String(NewMessage.sender._id) !== String(user._id) && socket.emit("message read",{message:NewMessage,user:user?._id});
                setChatlist(prev=>{
                    return prev.map((chat)=>{
                        if(chat._id===NewMessage.chat){
                            return{...chat,...copyActiveChat};
                        };
                        return chat ;
                    })
                })

            }else{
                console.log("desired code start running")
                setChatlist(prev=>
                    prev.map(chat=>
                        chat._id === NewMessage.chat
                        ?{
                            ...chat,
                            lastMessage:{
                            ...chat.lastMessage,
                            messageId:NewMessage._id,
                            sender:NewMessage.sender._id,
                            content:NewMessage.content,
                            readBy:[],
                        },
                        unreadCount:chat.unreadCount+1
                    }
                    : chat
                )
            );

            }
    
            
            if(String(NewMessage.sender._id) !== String(user._id)){
            socket.emit("message recieved",{message:NewMessage._id,user:user?._id})
            }
        }
        socket.on("new message",handleMessage);


        return () => {
            socket.off("new message",handleMessage)

        };
    },[activeChat?._id]);

    useEffect(()=>{
        const handleReadReciept = ({updatedChat})=>{
            setChatlist(prev=>
                prev.map(chat=>
                    chat._id === updatedChat._id
                    ?{...chat,lastMessage:updatedChat.lastMessage}
                    :chat
                )
            );
            console.log("running")
            setActiveChat(prev=>
                prev._id === updatedChat._id
                ? {...prev,lastMessage:updatedChat.lastMessage}
                : prev
            );
        };
        socket.on("message read",handleReadReciept);
        return () => socket.off("message read",handleReadReciept);
    },[activeChat?._id])


    useEffect(()=>{
        const handleDelivery = ({message,user})=>{
            return setMessages(prev=>
            prev.map(msg=>{
                if(String(msg._id)===String(message)){
                    return {...msg,
                        deliveredTo:[...msg.deliveredTo,user]
                    };    
                }
                return msg;
            })
           );
        };
        socket.on("message recieved",handleDelivery)


        return ()=> socket.off("message recieved",handleDelivery);
    },[]);

    useEffect(()=>{
        const handleOnline = ({user})=>{
             setotherUserActivity(prev=>({
                ...prev,
                [String(user)]:{
                    ...prev[user],
                    isOnline:true
                }
            }));
        };

        const handleOffline = ({user})=>{
            setotherUserActivity(prev=>({
                ...prev,
                [String(user)]:{
                    ...prev[user],
                    isOnline:false
                }
            }));
        }
        const handleTyping = ({chatId,user})=>{
            setotherUserActivity(prev=>({
                ...prev,
                [user]:{
                 ...prev[user],
                  typing:chatId
                }
            }));
        };
        const handleStopTyping = ({user})=>{
             setotherUserActivity(prev=>({
                ...prev,
                [user]:{
                    ...prev[user],
                    typing:undefined
                }
            }));
        };
        socket.on("user online",handleOnline);
        socket.on("user offline",handleOffline);
        socket.on("typing",handleTyping);
        socket.on("stop typing",handleStopTyping);
        return ()=> {
            socket.off("user online",handleOnline);
            socket.off("user offline",handleOffline);
            socket.off("typing",handleTyping);
            socket.off("stop typing",handleStopTyping);
        }
    },[]);


    useEffect(()=>{
        console.log("active chat",chatlist)
    },[chatlist]);

 

    return <>
    {loading?(<div className="loading">Loading...</div>):
    (
    <>
    <div className="aurora-bg">
        <div className="blob1"></div>
        <div className="blob2"></div>
        <div className="blob3"></div>

    </div>
    <div className="chatpage-container">
        <ChatSidebar chatlist={chatlist} otherUserActivity={otherUserActivity} setChatlist={setChatlist}  user={user} loading={loading} onSelectChat={setActiveChat}/>        
        <ChatWindow  messages={messages}otherUserActivity={otherUserActivity}  messageLoading={messageLoading} activeChat={activeChat} user={user}/>
        
    </div>
    </>)
}

    </>
}


export default Chat;