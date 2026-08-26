function SettingFooter({setSettingView}){
    return<><div className="mb-5 pl-5 pb-3">
  <button
    type="button"
    onClick={() => setSettingView("nav")}
    className="flex items-center gap-2 text-sm text-obsidian-muted hover:text-on-surface transition-colors">
    <span
      className="material-symbols-outlined"
      style={{ fontSize: "18px" }}
    >
      arrow_back
    </span>

    <span className="text-sm">Back to Settings</span>
  </button>
</div>

</>
};

export default SettingFooter;