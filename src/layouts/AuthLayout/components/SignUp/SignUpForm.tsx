import { useState } from "react";
import type { FormEvent } from "react";
import api from "../../../../services/api";
import useUserStore from "../../../../app/store/userStore";
import axios from "axios";

function SignUpForm(){
    type passwordView = null|"password"|"confirmPassword";
    const[visiblePassword,setVisiblePassword] = useState<passwordView>(null);
    const setUser = useUserStore((state)=>state.setUser)

    const handleSubmit = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        let res;
        try {
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());
            res = await api.post('/api/auth/register',data);
            localStorage.setItem("token",res.data.token);
            setUser(res.data.user);
        }catch (error ) {
          if(axios.isAxiosError(error)){
            console.log("Error details:",error?.response?.data,error?.response?.status);
          }
        }
    }

    return<>

  {/* Form */}
  <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
    {/* Username */}
    <div className="flex flex-col gap-2">
      <label
        className="font-label-lg text-label-lg text-on-surface-variant" >Username</label>

      <div className="relative flex items-center">
        <span className="material-symbols-outlined absolute left-3 text-on-surface-variant" style={{ fontVariationSettings: "'FILL' 0" }}>person</span>

        <input
          className="w-full bg-surface-container-high border-none rounded-lg py-3 pl-10 pr-4 text-on-surface font-body-md focus:ring-1 focus:ring-primary outline-none transition-shadow placeholder:text-on-surface-variant/50"
           placeholder="Your unique username" required type="text" name="userName"/>
      </div>
    </div>

    {/* Email */}
    <div className="flex flex-col gap-2">
      <label className="font-label-lg text-label-lg text-on-surface-variant">Email Address</label>
      <div className="relative flex items-center">
        <span className="material-symbols-outlined absolute left-3 text-on-surface-variant" style={{ fontVariationSettings: "'FILL' 0" }}>mail</span>
        <input className="w-full bg-surface-container-high border-none rounded-lg py-3 pl-10 pr-4 text-on-surface font-body-md focus:ring-1 focus:ring-primary outline-none transition-shadow placeholder:text-on-surface-variant/50"
        id="email" placeholder="you@example.com" required type="email" name="email"/>
      </div>
    </div>

    {/* Password */}
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <label className="font-label-lg text-label-lg text-on-surface-variant">Password</label>
        
      </div>

      <div className="relative flex items-center">
        <span className="material-symbols-outlined absolute left-3 text-on-surface-variant" style={{ fontVariationSettings: "'FILL' 0" }}>lock</span>

        <input className="w-full bg-surface-container-high border-none rounded-lg py-3 pl-10 pr-10 text-on-surface font-body-md focus:ring-1 focus:ring-primary outline-none transition-shadow placeholder:text-on-surface-variant/50"
          id="password" placeholder="••••••••" required type={visiblePassword==="password"?"text":"password"} name="password"/>
        <button
          className="absolute right-3 text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none"
          type="button" onClick={()=>{setVisiblePassword(prev=> prev==="password"? null : "password" )}}>
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0" }}>
            {visiblePassword==="password"?"visibility":"visibility_off"}
          </span>
        </button>
      </div>
    </div>

    {/* Confirm Password */}
    <div className="flex flex-col gap-2">
      <label className="font-label-lg text-label-lg text-on-surface-variant">Confirm Password</label>

      <div className="relative flex items-center">
        <span className="material-symbols-outlined absolute left-3 text-on-surface-variant" style={{ fontVariationSettings: "'FILL' 0" }}>lock_reset</span>

        <input className="w-full bg-surface-container-high border-none rounded-lg py-3 pl-10 pr-10 text-on-surface font-body-md focus:ring-1 focus:ring-primary outline-none transition-shadow placeholder:text-on-surface-variant/50"
        id="confirm-password" placeholder="••••••••" required type={visiblePassword==="confirmPassword"?"text":"password"} name="confirmPassword"/>

        <button className="absolute right-3 text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none" type="button" 
        onClick={()=>{setVisiblePassword(prev=>prev==="confirmPassword"? null:"confirmPassword")}}  >
          <span className="material-symbols-outlined text-xl"style={{ fontVariationSettings: "'FILL' 0" }}>
            {visiblePassword==="confirmPassword"?"visibility":"visibility_off"}</span>
        </button>
      </div>
    </div>

    {/* Remember Me */}
    <div className="flex items-center gap-3 mt-1">
      <input
        className="w-4 h-4 rounded bg-surface-container-high border-none text-primary focus:ring-primary focus:ring-offset-surface focus:ring-offset-0" id="remember" type="checkbox"/>

      <label className="font-body-md text-body-md text-on-surface-variant select-none cursor-pointer">Remember me</label>
    </div>

    {/* Submit Button */}
    <button
      className="w-full bg-primary text-on-primary font-label-lg text-label-lg py-3 rounded-lg hover:bg-surface-tint transition-colors active:scale-[0.98] mt-2" type="submit" >Sign Up
    </button   >
    
  </form>

  {/* Divider */}

  {/* Social Login */}

</>
};


export default SignUpForm;