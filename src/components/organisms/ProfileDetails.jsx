
function ProfileDetails({ user , selectPorfileView }){
     const userAvatar = user?.avatar?.secure_url ;
  const userName =  user?.username;
  const userEmail = user?.email;
  const usersPrefix = userName.slice(0,2);

    return<><div className="w-full md:w-sidebar-width h-full bg-surface-container-low/80
        backdrop-blur-xl border-r border-outline-variant/30  md:flex flex-col shrink-0 relative z-40">
          
    <div className="p-6 border-b border-obsidian-panel flex items-center space-x-4">
      <h1 className="text-xl font-semibold">Profile</h1>
    </div>
    <div className="p-6 flex flex-col items-center">
      <div className="relative mb-6">
        <div className="w-32 h-32 rounded-[999px] overflow-hidden  shadow-lg ring-2 ring-white/90 ">
          {userAvatar ? (<img alt="Profile Picture" src={userAvatar} className="w-full h-full object-cover" />)
          :
          (<div className="w-full h-full bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-700 text-white flex 
          items-center justify-center text-headline-lg shadow-xl">{usersPrefix}</div>)}
        </div>
        <div className="absolute bottom-1 right-1 bg-obsidian-input w-8 h-8  rounded-[9999px] border border-obsidian-panel
         text-white flex items-center justify-center cursor-pointer hover:bg-primary-container hover:scale-110 
         transition-all duration-300"onClick={()=>{selectPorfileView("avatar")}}>
        <span className="material-symbols-outlined " style={{ fontSize: "14px" }}>edit</span>
        </div>
      </div>
      <div className="w-full space-y-6">
        <div><label className="block text-xs font-medium text-obsidian-muted uppercase tracking-wider mb-1">Username</label>
          <p className="text-white font-medium">{userName}</p>
        </div>
        <div>
        <label className="block text-xs font-medium text-obsidian-muted uppercase tracking-wider mb-1">Email</label>
        <p className="text-white font-medium">{userEmail}</p>
      </div>
      <div>
        <label className="block text-xs font-medium text-obsidian-muted uppercase tracking-wider mb-1">Bio</label>
        <p className="text-obsidian-muted text-sm">Add a short bio...</p>
      </div>
    </div>
  </div>
  </div>
    </>
};

export default ProfileDetails;