import { useState } from "react";
import type { JSX } from "react";
import AvatarOptionsDialog from "./AvatarOptionsDialog.jsx";
import AvatarUploadForm from "./AvatarUploadForm.jsx";
import type { ProfileView } from "../../pages/Profile.js";


interface prop{
    selectProfileView:(view:ProfileView)=>void,
    setProfileView:(view:ProfileView)=>void
}


type AvatarView = "avatarDialog"|"avatarUploadForm";

function Avatar({ selectProfileView , setProfileView }:prop){

    const[avatarView,setAvatarView]=useState<AvatarView>("avatarDialog");

    const avatarViewMap:Record<AvatarView,()=>JSX.Element>={
        "avatarDialog" : ()=><AvatarOptionsDialog selectAvatarView={setAvatarView}  selectProfileView={selectProfileView}/>,
        "avatarUploadForm" : () => <AvatarUploadForm  selectAvatarView={setAvatarView} setProfileView={setProfileView}
         /> 
    }


    return<><div className="fixed inset-0 bg-black/70 z-[100]  flex items-center
     justify-center p-4 backdrop-blur-sm" id="file-modal-overlay">

<div className="bg-obsidian-panel w-full max-auto max-w-md rounded-xl shadow-2xl   
border border-obsidian-input overflow-hidden flex flex-col"
 style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>

{avatarViewMap[avatarView]()}


</div>
</div>

    </>
};

export type {AvatarView};
export default Avatar;

