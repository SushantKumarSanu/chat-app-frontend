




function ChatList({chatlist , user , onSelectChat , otherUserActivity , setChatlist }){




    const userId = String(user?._id) ;



    const handleSelectChat = (chat)=>{
        
        const modifiedChat = 
        {
            ...chat,
            unreadCount:0
        };

        onSelectChat(modifiedChat);

        setChatlist(prev=>
            prev.map((chat)=>{
                if(String(chat._id)===String(modifiedChat._id))
                {
                    return{...chat,...modifiedChat}
                };
                return chat;
            })
        )
    }; 




    return<>
        {
            chatlist?.map((chat)=>{

                const otherUser = userId ? chat.users.find(u => String(u._id) !== userId) : null;
                const otherUserName = otherUser?.username??"Guest" ;
                const activity = otherUserActivity[otherUser?._id];

                const lastMessagePreview = chat.lastMessage?.content ?? "no messages yet" ;

            return <div key={chat._id} className="chat" onClick={()=>{handleSelectChat(chat)}}>

                    <div className="avatar-wrap">
                        <div className="avatar">PFL</div>
                        {activity?.isOnline&&<span className="status-dot online"></span>}
                    </div>

                    <div className="contact-info">

                        <div className="contact-top">

                            <span className="name">{otherUserName}</span>

                            {chat.unreadCount>0 && <span className="unread-badge">{chat.unreadCount}</span>}

                        </div>

                        {activity?.typing
                        ?<span className="typing">typing</span>
                        :<span className="message-prev">{lastMessagePreview}</span> }

                    </div>
                </div>

            })
        }
    </>
}
export default ChatList;