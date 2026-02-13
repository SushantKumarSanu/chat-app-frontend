function ChatWindow({activeChat,user,messages,messageLoading}){
    const otherusers =  activeChat?.users?.find(
                u=> u._id !==user?._id
            )||{};

                
    return<>
        {!(activeChat?._id)?(<div > <h2>Select a Chat</h2></div>): 
        (
        <><div className="chat-window">
            <h2>{otherusers?.username}</h2>
            {messageLoading?(<div className="loading">Loading...</div>):
            (<div className="message-container">
                {messages.map(msg =>{
                    const isMine = msg.sender?._id===user?._id;
                    const senderName = msg.sender?.username || "Unknown";
                    return(
                    <div className={`message ${isMine?'my-message':'others-message'}`} key={msg._id}>
                        <h3>{msg.content}</h3>
                        <h4>{senderName}</h4>
                        <h5>{new Date(msg.createdAt).toLocaleString()}</h5>
                    </div>
                    )
                })}

               
            </div>)}
        </div>
        </>)
        }
    </>             
}


export default ChatWindow;
// activeChat?activeChat.users.username:"Select a chat"