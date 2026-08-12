import { formatTime } from '../../utils/formatTime.js';

function MessageList({activeChat , messages , otherUserActivity , messageEndRef , user }){

        const otherUser =  activeChat?.users?.find( 
            u=> String(u._id) !==String(user?._id)
            )?? null ;
        
        const otherUserId =  String(otherUser?._id) ;   



    return (<div className="flex-1 overflow-y-auto pt-20 md:pt-24 pb-6 px-4 md:px-container-margin flex flex-col gap-stack-gap">
                {messages.map(msg =>{

                    const otherUserName = otherUser?.username??"Guest" ;
                    const othersAvatar = otherUser?.avatar?.secure_url ;
                    const othersprefix = otherUserName.slice(0,2);
                    
                    const isMine = msg.sender?._id===user?._id;
                    const senderName = msg.sender?.username || "Unknown";
                    const lastMessageId =activeChat?.lastMessage?.messageId;
                   

                    const deliveredTo = msg.deliveredTo.includes(otherUserId);
                    const isRead = (String(activeChat?.lastRead?.[otherUserId]) === String(msg._id)) ;


                    return<>
                    {isMine ?
                    <div key={msg._id} className="flex items-end gap-2 max-w-[90%] md:max-w-[80%] self-end group mt-2">
                        <div className="bg-gradient-to-br from-primary-container/25 to-surface-variant/50 border border-primary/20 shadow-lg shadow-primary/5 text-white p-message-padding rounded-3xl rounded-br-md font-body-md transition-transform duration-300 group-hover:-translate-y-0.5">
                            <p className="leading-relaxed text-[#f4f3f8]">{msg.content}</p>
                            <div className="flex items-center justify-end gap-1 mt-1 opacity-70">
                                <span className="text-[10px] font-label-sm">{formatTime(msg.createdAt)}</span>
                                {deliveredTo && <span className={`material-symbols-outlined text-primary !text-[14px] ${isRead ?"read":""}`} style={{ fontVariationSettings: "'FILL' 1" }}>done_all</span>}
                            </div>
                        </div>
                    </div>
                    :<div
  key={msg._id}
className="flex items-end gap-2 md:gap-3 max-w-[90%] md:max-w-[80%] group">
  {othersAvatar ? (
    <img
      src={othersAvatar}
      alt=""
      className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover shrink-0 shadow-sm"
    />
  ) : (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary-container to-surface-variant text-on-secondary-container flex items-center justify-center shrink-0 font-headline-md font-bold shadow-sm">
      {othersprefix}
    </div>
  )}

  <div className="bg-[#1f1f26]/30 backdrop-blur-xl border border-outline-variant/20 shadow-lg shadow-black/20 text-white p-message-padding rounded-3xl rounded-bl-md font-body-md transition-transform duration-300 group-hover:-translate-y-0.5">
    <p className="leading-relaxed">
      {msg.content}
    </p>

    <div className="flex items-center justify-end gap-1 mt-1 opacity-70">
      <span className="text-[10px] font-label-sm">
        {formatTime(msg.createdAt)}
      </span>
    </div>
  </div>
</div>}
                       
                </>
                })}
                
                <div ref={messageEndRef}/>
                {otherUserActivity[otherUser?._id]?.typing && (
                    <div className="bg-gradient-to-br from-surface-container/20 to-[#0e0e11]/20 border border-outline-variant/20 shadow-lg shadow-black/20 text-white px-4 md:px-5 py-3 md:py-3.5 rounded-3xl rounded-bl-md flex items-center gap-1.5 h-[40px] md:h-[48px] backdrop-blur-xl bg-surface-container-low/30 mb-[4px]"><span class="w-1.5 h-1.5 bg-on-surface-variant/70 rounded-full typing-dot"></span><span class="w-1.5 h-1.5 bg-on-surface-variant/70 rounded-full typing-dot"></span><span class="w-1.5 h-1.5 bg-on-surface-variant/70 rounded-full typing-dot"></span></div>
                    // <div className="typing-bubble" id="chat-typing-bubble">
                    // <span></span><span></span><span></span>
                    // </div>
                )} 
            </div>)

}


export default MessageList;