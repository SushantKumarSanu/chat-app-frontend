import 'remixicon/fonts/remixicon.css';
import ChatHeader from './ChatHeader.jsx';
import MessageList from './MessageList.jsx';
import MessageInput from './MessageInput.jsx';
import { useChatStore } from '../../store/chatStore.js';

function ChatWindow({messageLoading}:{messageLoading:boolean}){
  const activeChat = useChatStore(state=>state.activeChat);







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

            <ChatHeader />
            
            {messageLoading?
            (<div className="loading">Loading...</div>)
            :
            (<MessageList/>)
            }
            <MessageInput  />
                
        </div>)            
}


export default ChatWindow;
