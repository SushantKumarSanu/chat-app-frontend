import useUserStore from "../../../../../app/store/userStore";
import type { AccountView } from "../Account.jsx";

interface prop{
  setAccountView:(view:AccountView)=>void
}



function AccountDetails({setAccountView}:prop) {

  const user = useUserStore((state)=>state.user);

  const userEmail = user?.email;
  return (
    <div className="p-6">

      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-on-surface">
          Account
        </h2>
      </div>

      {/* Account Details */}
      <div className="w-full space-y-6">

        {/* Account Information */}
        <div className="mb-3">
          <h3 className="text-[15px] font-semibold text-on-surface">
            Account Information
          </h3>
        </div>

        {/* Email */}
        <div>
        <label className="block text-sm font-medium text-obsidian-muted">Email</label>
        <div className="flex items-center gap-2 ">
            <p className="w-full text-sm text-white">{userEmail}</p>
            <button type="button" className="flex h-7 w-7 items-center 
            justify-center rounded-full text-obsidian-muted hover:bg-primary-container/15 hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>edit</span>
            </button>
       </div>
        </div>

        {/* Security */}
        <div className="mt-8 mb-3">
          <h3 className="text-[15px] font-semibold text-on-surface">
            Security
          </h3>
        </div>

        {/* Password */}
        <div>
        <label className="block text-sm font-medium text-obsidian-muted">Password</label>
        <div className="flex items-center gap-2">
            <p className="w-full text-sm  text-white">••••••••••••••</p>
            <button type="button" onClick={() => setAccountView("updatePassword")} className="flex h-7 w-7 
            items-center justify-center rounded-full text-obsidian-muted hover:bg-primary-container/15 hover:text-on-surface transition-colors" >
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>edit</span></button>
        </div>
        </div>
        </div>

    </div>
  );
}

export default AccountDetails;