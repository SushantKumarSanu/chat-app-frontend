function ChatSidebar({chatlist,user,loading,onSelectChat,typingByChat,unreadByChat}){

    
    return<>

    <div className="chatlist">
        <h1>Chatlist</h1>
        {
        chatlist?.map((elem)=>{

            const otherusers = elem.users.find(
                u => u._id !== user._id
            );

        return <div key={elem._id} className="chat" onClick={()=>{
            onSelectChat(elem);
        }}>

            <div className="chat-name">
            <h2>{otherusers?.username??"Guest"}</h2>
             {typingByChat[elem._id] && <h3 className="typing">typing</h3>}
            {unreadByChat[elem._id]?.count >0  && <h3 className="unread-count">{unreadByChat[elem._id].count}</h3>}
            </div>
            {unreadByChat[elem._id]?.content && <p className="message-prev">{unreadByChat[elem._id].content}</p>}
            
            
        </div>

        })}
    </div>
    </>
}


export default ChatSidebar;


