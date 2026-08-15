import { useEffect, useState } from "react";
import AvatarOptionsDialog from "./AvatarOptionsDialog.jsx";
import AvatarUploadForm from "./AvatarUploadForm.jsx";

function Avatar({ selectPorfileView ,profileView }){

    const[avatarView,setAvatarView]=useState("avatarDialog");

    useEffect(()=>{console.log(avatarView,"this is avatar view")},[avatarView]);
    const avatarViewMap ={
        "avatarDialog" : ()=><AvatarOptionsDialog selectAvatarView={setAvatarView} selectPorfileView={selectPorfileView}/>,
        "avatarUploadForm" : () => <AvatarUploadForm selectAvatarView={setAvatarView}/> 
    }


    return<><div class="fixed inset-0 bg-black/70 z-[100]  flex items-center justify-center p-4 backdrop-blur-sm" id="file-modal-overlay">
{/* <!-- Modal Dialog --> */}
<div class="bg-obsidian-panel w-full max-auto max-w-md rounded-xl shadow-2xl border border-obsidian-input overflow-hidden flex flex-col" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>

{avatarViewMap[avatarView]?.()}

{/* <AvatarOptionsDialog selectPorfileView={selectPorfileView}/>
<AvatarUploadForm/> */}
</div>
</div>

    </>
};


export default Avatar;

