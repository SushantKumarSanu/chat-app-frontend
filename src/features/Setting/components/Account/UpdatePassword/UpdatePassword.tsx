import { useState } from "react"
import type { FormEvent } from "react";
import api from "../../../../../services/api";
import type { SettingView } from "../../../pages/Setting";
import type { AccountView } from "../Account";
import axios from "axios";

interface prop{
  setSettingView:(view:SettingView)=>void,
  setAccountView:(view:AccountView)=>void
}


function UpdatePassword({setSettingView,setAccountView}:prop){

  type passwordView = null|"current"|"new"|"confirm"


    const[visiblePassword,setVisiblePassword] = useState<passwordView>(null);

    const handleSubmit = async(e:FormEvent<HTMLFormElement>)=>{
        let res;
        try{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
         const data = Object.fromEntries(formData.entries());
        console.log(data)
        res = await api.patch('/api/account/password',data);
        localStorage.removeItem("token");

        console.log("Success",res);
        setSettingView("nav")
        }catch(error){
          if(axios.isAxiosError(error)){
            console.log("Error details:",error.response?.data,error.response?.status);
          }

        }

    }

    return<><div className="pt-4 pb-4 px-6">
  <button
    type="button"
    className="-ml-2 flex h-7 w-7 items-center justify-center rounded-full
               text-on-surface-variant hover:bg-surface-container-highest
               hover:text-on-surface transition-colors"
    onClick={() => setAccountView("details")}
  >
    <span className="material-symbols-outlined text-[20px]">
      chevron_left
    </span>
  </button>

  <h2 className="mt-2 text-[17px] font-semibold text-on-surface">
    Change Password
  </h2>
</div>

      <form className="flex-1 overflow-y-auto no-scrollbar pt-4 pb-6 pl-6 pr-6" onSubmit={handleSubmit}>
        <div className="mt-2 flex flex-col gap-6">
          <div className="flex flex-col gap-6">

            <div className="flex flex-col gap-2">
              <label className="text-xs text-on-surface-variant font-medium uppercase tracking-wider">Current Password</label>
              
              <div className="relative flex items-center bg-surface-container/50 rounded-xl border border-outline-variant/30 
              focus-within:border-primary/50 transition-colors">
              
                <input className="w-full bg-transparent border-0 focus:ring-0 px-4 py-3 text-on-surface font-body-md"
                placeholder="Enter current password" name="password"  type={visiblePassword==="current"? "text":"password"}/>
              
                <button className="absolute right-3 text-on-surface-variant hover:text-on-surface"
                onClick={()=>{setVisiblePassword(prev=>prev==="current"? null:"current")}}  type="button">
                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-on-surface-variant font-medium uppercase tracking-wider">New Password</label>

              <div className="relative flex items-center bg-surface-container/50 rounded-xl border border-outline-variant/30
              focus-within:border-primary/50 transition-colors">
                <input className="w-full bg-transparent border-0 focus:ring-0 px-4 py-3 text-on-surface font-body-md" 
                placeholder="Enter new password" name="newPassword"  type={visiblePassword==="new"? "text":"password"}/>
                
                <button className="absolute right-3 text-on-surface-variant hover:text-on-surface" 
                onClick={()=>{setVisiblePassword(prev=>prev==="new"? null:"new")}}  type="button">
                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-on-surface-variant font-medium uppercase tracking-wider">Confirm Password</label>
                
              <div className="relative flex items-center bg-surface-container/50 rounded-xl border border-outline-variant/30 
              focus-within:border-primary/50 transition-colors">
                <input className="w-full bg-transparent border-0 focus:ring-0 px-4 py-3 text-on-surface font-body-md" 
                placeholder="Confirm new password" name="confirmPassword" type={visiblePassword==="confirm"? "text":"password"}/>
                
                <button className="absolute right-3 text-on-surface-variant hover:text-on-surface"
                onClick={()=>{setVisiblePassword(prev=>prev==="confirm"? null:"confirm")}}  type="button">
                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                </button>
              </div>
            </div>

          </div>

          <div className="flex flex-col gap-3 mt-4">
            <button className="w-full py-3 bg-primary text-surface font-semibold rounded-xl hover:bg-primary/90 transition-colors"
              type="submit">Update Password</button>
            <button className="w-full py-3 text-on-surface font-medium rounded-xl hover:bg-surface-container-highest 
            transition-colors" type="reset">Cancel</button>
          </div>

        </div>

      </form>

    </>
};

export default UpdatePassword