

function ChatHeader({ activeChat , user , otherUserActivity }){


    const otherUser =  activeChat?.users?.find( 
        u=> String(u._id) !==String(user?._id)
        )?? null;

    const otherUserId = otherUser?._id ;

    const activity = otherUserActivity[otherUserId];



    return <>
    <div className="chat-title">
        <div className='avatar-wrap'>
            <div className='avatar'>SS</div>
            {activity?.isOnline && (<span className="status-dot online"></span>)}
        </div>

        <div className='chat-header-info'>
            <span className='name'>{otherUser?.username}</span>    
            {
                activity?.typing ?
                <span className='typing'>✎ typing...</span>
                :
                activity?.isOnline&&
                (<span className="chat-status-text" id="chat-status-text">● Online</span>)
            }
        </div>
    </div>
    
    
    
    
    </>    


    


};

export default ChatHeader;