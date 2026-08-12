

function ChatHeader({ activeChat , user , otherUserActivity }){


    const otherUser =  activeChat?.users?.find( 
        u=> String(u._id) !==String(user?._id)
        )?? null;

    const otherUserId = otherUser?._id ;
    const otherUserName = otherUser?.username??"Guest" ;

    const othersAvatar = otherUser?.avatar?.secure_url ;
    const othersprefix = otherUserName.slice(0,2);

    const activity = otherUserActivity[otherUserId];



    return <>
<div className="absolute top-0 w-full z-10 flex items-center justify-between px-4 md:px-6 h-16 bg-surface/70 backdrop-blur-xl border-b border-outline-variant/30 shrink-0">       
 <div className="flex items-center gap-3 md:gap-4">
            <div className='relative'>
                {othersAvatar?<img className="w-9 h-9 rounded-full object-cover shadow-sm" src={othersAvatar} alt="" />:<div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary-container to-surface-variant text-on-secondary-container flex items-center justify-center shrink-0 font-headline-md font-bold shadow-sm">{othersprefix}</div>}
                {activity?.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] z-20 border-2 border-surface/70 animate-pulse"></div>}
            </div>
            {activity?.isOnline && (<span className="status-dot online"></span>)}
        

            <div>
                <h1 className='font-headline-md text-headline-md font-bold text-on-surface'>{otherUser?.username}</h1> 

                <div className="flex items-center gap-2">
                {activity?.typing &&(
                    <>
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_6px_rgba(189,194,255,0.8)]"></span>
                        <span className="font-label-sm text-label-sm text-primary/90 font-medium">Typing...</span>
                    </>
                )}

                </div>
            </div>
        </div>
        <div className="flex items-center gap-1">
            <button aria-label="video_call" className="p-2 md:p-2.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 rounded-2xl cursor-pointer transition-all duration-300 ease-out active:scale-90">
                <span className="material-symbols-outlined text-[20px] md:text-[22px]">video_call</span>
            </button>
            <button aria-label="call" className="p-2 md:p-2.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 rounded-2xl cursor-pointer transition-all duration-300 ease-out active:scale-90">
                <span className="material-symbols-outlined text-[20px] md:text-[22px]">call</span>
            </button>
            <button aria-label="more_vert" className="p-2 md:p-2.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 rounded-2xl cursor-pointer transition-all duration-300 ease-out active:scale-90">
                <span className="material-symbols-outlined text-[20px] md:text-[22px]">more_vert</span>
            </button>
        </div>
    </div>
    </>    


    


};

export default ChatHeader;