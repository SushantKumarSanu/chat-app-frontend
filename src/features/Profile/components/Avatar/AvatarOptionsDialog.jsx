function AvatarOptionsDialog({selectPorfileView,selectAvatarView}){
    return<>
  {/* <!-- Header --> */}
<div className="p-6 border-b border-obsidian-input flex justify-between items-center">
<h2 className="text-xl font-semibold text-white" id="modal-title">Profile Photo</h2>
<button className="text-obsidian-muted hover:text-white transition-colors" id="close-modal-btn" onClick={()=>{selectPorfileView("") ; selectAvatarView(""); }}>
<span className="material-symbols-outlined">close</span>
</button>
</div>
{/* <!-- Initial Options --> */}
<div className="p-6 space-y-4" id="modal-initial-options">
<button className="w-full flex items-center space-x-4 p-4 rounded-lg  hover:bg-obsidian-input bg-obsidian-panel border border-obsidian-input transition-colors text-left group">
<div className="w-10 h-10 rounded-full bg-obsidian-bg flex items-center justify-center text-obsidian-muted group-hover:text-white">
<span className="material-symbols-outlined">visibility</span>
</div>
<div>
<p className="text-sm font-medium text-white">View Photo</p>
<p className="text-xs text-obsidian-muted">See your current profile picture</p>
</div>
</button>
<button className="w-full flex items-center space-x-4 p-4 rounded-lg  hover:bg-obsidian-input bg-obsidian-panel border border-obsidian-input transition-colors text-left group" id="trigger-upload-view" onClick={()=>{selectAvatarView("avatarUploadForm")}}>
<div className="w-10 h-10 rounded-full bg-obsidian-bg flex items-center justify-center text-obsidian-muted group-hover:text-white">
<span className="material-symbols-outlined">upload</span>
</div>
<div>
<p className="text-sm font-medium text-white">Upload Photo</p>
<p className="text-xs text-obsidian-muted">Change your profile picture</p>
</div>
</button>
</div>

    </>
};

export default AvatarOptionsDialog;