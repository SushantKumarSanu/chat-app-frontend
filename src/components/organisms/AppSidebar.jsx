

function AppSidebar({ user , selectView }) {
    const userAvatar = user?.avatar?.secure_url;
    const usersPrefix = user?.username?.slice(0,2);
  return (
    <nav className="fixed bottom-0 left-0 z-50 flex h-16 w-full flex-row items-center 
    justify-around border-t border-outline-variant/30 bg-surface-container-lowest/80 backdrop-blur-xl
    md:top-0 md:bottom-auto md:h-full md:w-20 md:flex-col md:justify-start md:border-t-0 md:border-r md:py-4">
      {/* Avatar */}
        <div className="hidden md:flex mb-8 flex-col items-center gap-2">
          {userAvatar ? (<img className="h-10 w-10 rounded-[9999px] object-cover shadow-sm"
            data-alt="User profile avatar" src={userAvatar} alt="Profile"/>)
            :
            (<div className="w-10 h-10 rounded-[9999px] bg-gradient-to-br from-violet-500
            via-purple-500 to-indigo-600 text-white flex items-center justify-center shrink-0 
            font-bold shadow-xl ring-2 ring-violet-400/40 hover:scale-105 transition-all 
            duration-300">{usersPrefix} </div> )}

        </div>

        {/* Navigation */}
        <div className="flex w-full flex-1 flex-row items-center justify-around gap-1 
        md:flex-col md:items-center md:justify-start md:gap-4 md:px-2">
           
            {/* Chats */}
            <button type="button" aria-label="Chats" className="flex h-full items-center 
            justify-center gap-1 px-4 text-on-surface-variant transition-all duration-300 
            ease-out active:scale-90 md:h-auto md:aspect-square md:w-full md:px-0 md:flex-col" onClick={()=>{selectView("chats")}}>
                
                <span className="material-symbols-outlined text-2xl  p-2 rounded-xl transition-colors
                duration-300 hover:bg-primary-container/20 hover:text-white transition-colors group" >
                    forum
                </span>

                <span className="hidden md:block font-label-sm text-label-sm ">
                    Chats
                </span>

            </button>
            
        {/* Status */}
            <button type="button" aria-label="Status" className=" flex h-full items-center 
            justify-center gap-1 px-4 text-on-surface-variant transition-all duration-300 ease-out 
            active:scale-90 md:h-auto md:aspect-square md:w-full md:px-0 md:flex-col">
                <span className="material-symbols-outlined text-2xl  p-2 rounded-xl transition-colors
                duration-300 hover:bg-primary-container/20 hover:text-white transition-colors group" 
                style={{ fontVariationSettings: "'FILL' 1" }}>radar</span>
                <span className="hidden md:block font-label-sm text-label-sm">
                Status
                </span>
            </button>

        {/* Profile */}
        <button type="button" aria-label="Profile" className="flex h-full items-center justify-center gap-1 
        px-4 text-on-surface-variant transition-all duration-300 ease-out active:scale-90 md:h-auto 
        md:aspect-square md:w-full md:px-0 md:flex-col" onClick={()=>{selectView("profile")}}>
            <span className="material-symbols-outlined text-2xl  p-2 rounded-xl transition-colors
            duration-300 hover:bg-primary-container/20 hover:text-white transition-colors group">
                account_circle
            </span>

            <span className="hidden md:block font-label-sm text-label-sm">
                Profile
            </span>
        </button>
        {/* Settings */}
        <button type="button" aria-label="Settings" className="settings-icon-hover flex h-full items-center justify-center
        gap-1 px-4 text-on-surface-variant transition-all duration-300 ease-out 
        active:scale-90 md:h-auto md:aspect-square md:w-full md:px-0 md:flex-col">
            <span className="material-symbols-outlined text-2xl  p-2 rounded-xl  transition-transform
            duration-300 hover:bg-primary-container/20 hover:text-white transition-colors group">
                settings
            </span>

            <span className="hidden md:block font-label-sm text-label-sm">
                Settings
            </span>
        </button>
      </div>

      {/* Help */}
        <div className="hidden md:flex mt-auto w-full px-2">
            <button type="button" aria-label="Help"className="flex h-full items-center justify-center gap-1 px-4
            text-on-surface-variant transition-all duration-300 ease-out active:scale-90 md:h-auto 
            md:aspect-square md:w-full md:px-0 md:flex-col">
            <span className="material-symbols-outlined text-2xl  p-2 rounded-xl  transition-transform
            duration-300 hover:bg-primary-container/20 hover:text-white transition-colors group">
                help
            </span>
                <span className="hidden md:block font-label-sm text-label-sm">
                Help
                </span>
            </button>
      </div>

    </nav>
  );
}




export default AppSidebar;