import { useEffect, useRef, useState } from "react";
import api from "../../services/api";
function AvatarUploadForm({ selectAvatarView , selectPorfileView , profileView , setUser }){


    const [selectedAvatar,setSelectedAvatar]= useState();
    const fileInputRef = useRef(null);

    useEffect(()=>{
        console.log("This is selected image url",selectedAvatar);
    },[selectedAvatar]);

    const handleProfileAvatar = async ()=>{
        const file = fileInputRef.current?.files[0];
        if(!file) return ;
        const blobUrl = URL.createObjectURL(file);
        const formData = new FormData ();
        formData.append('avatar',file);
        let res;

        try {
            res = await api.patch("/api/protected/profile/avatar",formData);
            const avatar_url = res.data.user?.avatar?.secure_url;

            setUser(prev=>{
                return{
                    ...prev,
                    avatar: {
                    ...prev.avatar,
                    secure_url:avatar_url
                    }
                }
            })
            selectPorfileView(null);
            
        } catch (error) {
            console.log(error);
        }

    };
    



    return<><div className="p-6 space-y-6 " id="modal-upload-form">
<div className="space-y-2">
<label className="block text-xs font-medium text-obsidian-muted uppercase tracking-wider">Select Image</label>
<div className="border-2 border-dashed border-obsidian-input rounded-lg p-8 flex 
flex-col items-center justify-center space-y-3 hover:border-obsidian-accent/50 
transition-colors cursor-pointer bg-obsidian-bg/50" 
onClick={()=>{fileInputRef.current?.click();}}>
<span className="material-symbols-outlined text-4xl text-obsidian-muted">image</span>
{!selectedAvatar ?(<><div className="text-center">
<p className="text-sm text-white">Click to upload or drag and drop</p>
<p className="text-xs text-obsidian-muted mt-1">PNG, JPG or WEBP (max. 5MB)</p>
</div></>) :(<><div className="w-30 h-30 rounded-[999px] overflow-hidden  shadow-lg ring-2 ring-white/90 "> 
<img alt="Avatar Preview" src={selectedAvatar} className="w-full h-full object-cover" />
</div>
<p className="text-sm text-white">Click to upload another image</p>

</>) }
<input ref={fileInputRef}  className="hidden"   accept="image/*" id="file-input" type="file" 
onChange={()=>{
    const file = fileInputRef.current?.files[0];
    if(!file) return ;
    const blobUrl = URL.createObjectURL(file);
    setSelectedAvatar(blobUrl)
    }}/>
</div>
</div>
<div className="flex justify-between items-center pt-2">
<button className="flex items-center space-x-2 text-sm font-medium text-obsidian-muted hover:text-white 
transition-colors" id="back-to-options" onClick={()=>{selectAvatarView("avatarDialog"); }}>
<span className="material-symbols-outlined text-sm">arrow_back</span>
<span>Back</span>
</button>
<div className="flex space-x-3">
<button className="px-4 py-2 rounded-lg text-sm font-medium text-obsidian-muted hover:text-white
 hover:bg-obsidian-input transition-colors" id="cancel-modal-btn-new" 
 onClick={()=>{selectPorfileView(null)}}>Cancel</button>
<button className="px-6 py-2 rounded-lg text-sm font-medium bg-white text-obsidian-bg
 hover:bg-obsidian-text transition-colors" 
 onClick={handleProfileAvatar}>Save Photo</button>
</div>
</div>
</div>
    </>
};

export default AvatarUploadForm;