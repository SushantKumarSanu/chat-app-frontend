import { useEffect, useState } from "react";
import api from "../../services/api";

function ProfileDetails({ user , selectPorfileView ,setUser}){

  const userName =  user?.username;
  const [userNameInput,setUserNameInput] = useState(userName);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const userAvatar = user?.avatar?.secure_url ;
  const userEmail = user?.email;
  const usersPrefix = userName.slice(0,2);

  useEffect(()=>{
    console.log("this is user name input",userNameInput)
  },[userNameInput])


  const handleUserNameUpdate = async()=>{
    try {
      const res = await api.patch("/api/protected/profile/username",{
        userName:userNameInput
      });
      setIsEditingUsername(false);
      setUser(prev=>{
        return{
          ...prev,
          username:res.data.username
        }
      })
      console.log(res.data);

    } catch (error) {
     console.log(error) 
    }
  }


  // const handle userNameInputC
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
         text-white flex items-center justify-center cursor-pointer hover:bg-primary-interactive hover:scale-110 
         transition-all duration-300"onClick={()=>{selectPorfileView("avatar")}}>
        <span className="material-symbols-outlined " style={{ fontSize: "14px" }}>edit</span>
        </div>
      </div>


      <div className="w-full space-y-6">


        <div>
          <label className="block text-xs font-medium text-obsidian-muted uppercase tracking-wider mb-1">Email</label>
          <p className="text-white font-medium">{userEmail}</p>
        </div>

      

        <div>
          {isEditingUsername ?<>
          <label className="block text-xs font-medium text-obsidian-muted uppercase tracking-wider mb-1"> Username</label>
          <div className="flex items-center gap-2">
            <input className="w-full text-white font-medium bg-transparent border-none outline-none p-0" type="text" value={userNameInput} onChange={(e) => setUserNameInput(e.target.value)} />
            <button type="button" className="flex h-7 w-7 items-center justify-center rounded-full text-obsidian-muted hover:bg-obsidian-input hover:text-white transition-colors" onClick={handleUserNameUpdate}>
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>check</span>
            </button>
            <button type="button" className="flex h-7 w-7 items-center justify-center rounded-full text-obsidian-muted 
            hover:bg-obsidian-input hover:text-white transition-colors" onClick={()=>{setIsEditingUsername(false)}}>
           <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>close</span>
           </button>
          </div></> :<><label className="block text-xs font-medium text-obsidian-muted uppercase tracking-wider mb-1"> Username</label>
          <div className="flex items-center gap-2">
            <p className="w-full text-white font-medium">{userName}</p>
            <button type="button" className="flex h-7 w-7 items-center justify-center rounded-full text-obsidian-muted hover:bg-obsidian-input hover:text-white transition-colors" onClick={()=>{setIsEditingUsername(true)}}>
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>edit</span>
              </button>
              </div>
          </>}
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