function ChatSidebar({chatlist,user,loading,onSelectChat,typingByChat,unreadByChat}){

    
    return<>
    <div className="sidebar">
        <div className="sidebar-header">
            <div className="avatar">PFL</div>
            <span className="name">{user?.username}</span>
        </div>
            {
            chatlist?.map((elem)=>{

                const otherusers = elem.users.find(
                    u => u._id !== user._id
                );

            return <div key={elem._id} className="chat" onClick={()=>{
                onSelectChat(elem);
            }}>

                <div className="avatar-wrap">
                    <div className="avatar">PFL</div>
                    <span className="status-dot online"></span>
                </div>
                <div className="contact-info">
                    <div className="contact-top">
                        <span className="name">{otherusers?.username??"Guest"}</span>
                        {unreadByChat[elem._id]?.count >0 && <span className="unread-badge">{unreadByChat[elem._id].count}</span>}
                    </div>
                    {typingByChat[elem._id]
                    ?<span className="typing">typing</span>
                    :unreadByChat[elem._id]?.content && <span className="message-prev">{unreadByChat[elem._id].content}</span>}

                </div>
            </div>

            })}
        </div> 
    </>
}


export default ChatSidebar;


