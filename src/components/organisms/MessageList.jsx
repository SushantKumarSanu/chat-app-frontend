import { formatTime } from '../../utils/formatTime.js';

function MessageList({activeChat , messages , otherUserActivity , messageEndRef , user }){

        const otherUser =  activeChat?.users?.find( 
            u=> String(u._id) !==String(user?._id)
            )?? null ;
        
        const otherUserId =  String(otherUser?._id) ;   



    return (<div className="message-container">
                {messages.map(msg =>{

                    const isMine = msg.sender?._id===user?._id;
                    const senderName = msg.sender?.username || "Unknown";
                    const lastMessageId =activeChat?.lastMessage?.messageId;
                    
                    const deliveredTo = msg.deliveredTo.includes(otherUserId);
                    const isRead = (String(activeChat?.lastRead?.[otherUserId]) === String(msg._id)) ;


                    return<>
                    <div className={`bubble-wrap ${isMine?'sent-wrap':'received-wrap'}`} key={msg._id}>
                        {!isMine && <span className="bubble-sender">{senderName}</span>}

                        <div className={`bubble ${isMine?'sent':'received'}`}>

                            {msg.content}
                            <div className="bubble-footer">
                                <span className="bubble-time">{formatTime(msg.createdAt)}</span>
                                {isMine && deliveredTo && <span className={`tick ${isRead ?'read':''} `} >✓✓</span>}
                            </div>
                        </div>
                    </div>
                       
                </>
                })}
                
                <div ref={messageEndRef}/>
                {otherUserActivity[otherUser?._id]?.typing && (<div className="typing-bubble" id="chat-typing-bubble">
                    <span></span><span></span><span></span>
                    </div>)} 
            </div>)

}


export default MessageList;