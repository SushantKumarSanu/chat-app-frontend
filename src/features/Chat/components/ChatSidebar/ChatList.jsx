import { useEffect } from "react";





function ChatList({ chatlist , user , onSelectChat , otherUserActivity , setChatlist , activeChat }){



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




    return<><div className="flex-1 overflow-y-auto px-2">
        {
            chatlist?.map((chat)=>{

                const otherUser = userId ? chat.users.find(u => String(u._id) !== userId) : null;
                const otherUserName = otherUser?.username??"Guest" ;
                const othersAvatar = otherUser?.avatar?.secure_url ;
                const activity = otherUserActivity[otherUser?._id];
                const othersprefix = otherUserName.slice(0,2);

                const isActive = String(activeChat?._id) === String(chat._id);

                const lastMessagePreview = chat.lastMessage?.content ?? "no messages yet" ;

            return <div key={chat._id}  className="py-1" onClick={()=>{handleSelectChat(chat)}}>

                <button className={`w-full p-3 flex items-start gap-3 rounded-2xl relative text-left group transition-all duration-300 ease-out active:scale-[0.98]
                    ${isActive ? "bg-surface-container-highest/60 shadow-sm" : "hover:bg-surface-container-high/50"}`}>

                {isActive && (<div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-primary rounded-r-full shadow-[0_0_8px_rgba(189,194,255,0.6)]" />)}

                {othersAvatar?<img src={othersAvatar} alt="" className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover shrink-0 shadow-sm" />:<div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary-container to-surface-variant text-on-secondary-container flex items-center justify-center shrink-0 font-headline-md font-bold shadow-sm">{othersprefix}</div>}
                


                    <div className="flex-1 min-w-0">

                        <div className="flex justify-between items-baseline mb-0.5">

                            <span className="font-body-md font-bold text-on-surface truncate">{otherUserName}</span>
                            {activity?.isOnline&&<span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>}


                        </div>
                        <div className="flex items-center gap-1 text-primary">
                        {activity?.typing
                        ?
                        <div className="flex gap-0.5 items-center h-4">
                        <span className="w-1 h-1 bg-primary rounded-full typing-dot"></span>
                        <span className="w-1 h-1 bg-primary rounded-full typing-dot"></span>
                        <span className="w-1 h-1 bg-primary rounded-full typing-dot"></span>
                        </div>
                        :<span className="font-body-md text-on-surface-variant truncate">{lastMessagePreview}</span> }
                        </div>
                        {chat.unreadCount>0 &&<span className="absolute bottom-3 right-2 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-on-primary font-label-sm text-[10px] font-bold shadow-[0_0_8px_rgba(189,194,255,0.4)] z-10">{chat.unreadCount}</span>}
                    </div>
                    </button>
                </div>
                

            })
        }
        </div>
        
    </>
}
export default ChatList;