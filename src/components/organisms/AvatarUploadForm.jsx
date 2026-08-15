
function AvatarUploadForm({selectAvatarView}){
    return<><div className="p-6 space-y-6 " id="modal-upload-form">
<div className="space-y-2">
<label className="block text-xs font-medium text-obsidian-muted uppercase tracking-wider">Select Image</label>
<div className="border-2 border-dashed border-obsidian-input rounded-lg p-8 flex flex-col items-center justify-center space-y-3 hover:border-obsidian-accent/50 transition-colors cursor-pointer bg-obsidian-bg/50">
<span className="material-symbols-outlined text-4xl text-obsidian-muted">image</span>
<div className="text-center">
<p className="text-sm text-white">Click to upload or drag and drop</p>
<p className="text-xs text-obsidian-muted mt-1">PNG, JPG or WEBP (max. 5MB)</p>
</div>
<input accept="image/*" className="hidden" id="file-input" type="file"/>
</div>
</div>
<div className="flex justify-between items-center pt-2">
<button className="flex items-center space-x-2 text-sm font-medium text-obsidian-muted hover:text-white transition-colors" id="back-to-options">
<span className="material-symbols-outlined text-sm">arrow_back</span>
<span>Back</span>
</button>
<div className="flex space-x-3">
<button className="px-4 py-2 rounded-lg text-sm font-medium text-obsidian-muted hover:text-white hover:bg-obsidian-input transition-colors" id="cancel-modal-btn-new" onClick={()=>{selectAvatarView("avatarDialog")}}>Cancel</button>
<button className="px-6 py-2 rounded-lg text-sm font-medium bg-white text-obsidian-bg hover:bg-obsidian-text transition-colors">Save Photo</button>
</div>
</div>
</div>
    </>
};

export default AvatarUploadForm;