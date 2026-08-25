function SettingNav({setSettingView}){
    return<><div className="px-2 py-4">
        {/* Navigation */}

                {/* User Settings */}



                <h3 className="font-label-sm text-[11px] font-medium
                    text-on-surface-variant uppercase tracking-wider
                    px-2 mb-2"> User Settings</h3>

                <div className="space-y-[1px]">

                        {/* Profile */}
                    <div className="flex items-center gap-4 px-2 py-2.5 rounded-xl hover:bg-primary-container/15
                        transition-colors text-on-surface relative group">

                        <span className="material-symbols-outlined text-[22px] shrink-0  group-hover:text-on-surface
                            transition-colors">person</span>
                        <div className="flex-1 text-[15px] font-medium">Profile</div>

                    </div>

                    {/* Account */}
                    <div className="flex items-center gap-4 px-2 py-2.5 rounded-xl hover:bg-primary-container/15
                        transition-colors text-on-surface-variant hover:text-on-surface group" onClick={()=>{setSettingView("account")}}>

                        <span className="material-symbols-outlined text-[22px] shrink-0 group-hover:text-on-surface
                            transition-colors">manage_accounts</span>
                        <div className="flex-1 text-[15px] font-medium">Account</div>

                    </div>

                        {/* Privacy */}
                    <div className="flex items-center gap-4 px-2 py-2.5 rounded-xl hover:bg-primary-container/15
                        transition-colors text-on-surface-variant hover:text-on-surface group">

                        <span className="material-symbols-outlined text-[22px] shrink-0 group-hover:text-on-surface
                        transition-colors">shield</span>
                        <div className="flex-1 text-[15px] font-medium">Privacy & Safety</div>

                    </div>
                </div>
            </div>

    </>
}

export default SettingNav;