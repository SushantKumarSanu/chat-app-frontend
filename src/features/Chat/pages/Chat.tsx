import ChatSidebar from "../components/ChatSidebar/ChatSidebar.jsx";
import ChatWindow from "../components/ChatWindow/ChatWindow.jsx";
import useDeliverySync from "../hooks/useDeliverySync.js";
import useReadSync from "../hooks/useReadSync.js";
import useUserActivitySync from "../hooks/useUserActivitySync.js";
import useChatRoomSync from "../hooks/useChatRoomSync.js";
import useChatInitialization from "../hooks/useChatInitialization.js"
import useMessageInitialization from "../hooks/useMessageInitialization.js";
import useIncomingMessageSync from "../hooks/useIncomingMessageSync.js";

function Chat(){

    const {loading} = useChatInitialization();
    useChatRoomSync();
    const {messageLoading} = useMessageInitialization();
    useUserActivitySync();
    useDeliverySync();
    useReadSync();
    useIncomingMessageSync();

    return <>
    {loading?(<div className="loading">Loading...</div>):
    (
    <>  <ChatSidebar/>
        <ChatWindow messageLoading={messageLoading}/>
    </>)
}

    </>
}


export default Chat;
