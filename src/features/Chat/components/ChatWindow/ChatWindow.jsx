import { useEffect, useRef} from 'react';
import 'remixicon/fonts/remixicon.css';
import ChatHeader from './ChatHeader.jsx';
import MessageList from './MessageList.jsx';
import MessageInput from './MessageInput.jsx';

function ChatWindow({activeChat,user,messages,messageLoading,otherUserActivity}){
  
    const messageEndRef = useRef(null);



    const scrollToBottom = ()=>{
        messageEndRef.current?.scrollIntoView({behavior:"smooth"});
    };



    useEffect(()=>{
        scrollToBottom();
    },[messages]);

    if(!activeChat?._id){
        return(
            <div>
                <h2>Select a Chat</h2>
            </div>
        )
    }

    return(<div className="flex-1 flex flex-col w-full min-w-0 h-full bg-[#0C0C0C] relative" style={{
            backgroundImage: `url("/chatwindowBackground.png")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundBlendMode: "luminosity",
            backgroundAttachment: "fixed",
        }} data-stitch-orig-opacity="0.85">

            <ChatHeader activeChat={activeChat} user={user} otherUserActivity={otherUserActivity}/>
            
            {messageLoading?
            (<div className="loading">Loading...</div>)
            :
            (<MessageList activeChat={activeChat} messages={messages} otherUserActivity={otherUserActivity} user={user} messageEndRef={messageEndRef}/>)
            }
    
            <MessageInput activeChat={activeChat} />
                
        </div>)            
}


export default ChatWindow;
