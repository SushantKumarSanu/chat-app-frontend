import {  useState } from "react";
import api from "../../../../services/api.js";
import "../../components/auth.css";
import useUserStore from "../../../../app/store/userStore.js";
import axios from "axios";



function LoginForm() {
    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const[visiblePassword,setVisiblePassword] = useState(false);
    const setUser = useUserStore((state)=>state.setUser);


  return (

    <><form className="flex flex-col gap-5"  onSubmit={async(e)=>{
        e.preventDefault();
        try{
            const res = await api.post("/api/auth/login",{
                email,
                password
            })
            localStorage.setItem("token",res.data.token);
            setUser(res.data.user);
        }catch(error){
            if(axios.isAxiosError(error))
            console.error("Login failed:", error?.response?.data || error.message)
        }
         setEmail("");
        setPassword("");
    }}>
    {/* Username */}


    {/* Email */}
    <div className="flex flex-col gap-2">
      <label className="font-label-lg text-label-lg text-on-surface-variant">Email Address</label>

      <div className="relative flex items-center">
        <span className="material-symbols-outlined absolute left-3 text-on-surface-variant" 
        style={{ fontVariationSettings: "'FILL' 0" }}>mail</span>

        <input className="w-full bg-surface-container-high border-none rounded-lg py-3 pl-10 pr-4 text-on-surface
         font-body-md focus:ring-1 focus:ring-primary outline-none transition-shadow placeholder:text-on-surface-variant/50"
        id="email" placeholder="you@example.com" required value={email} type="email" onChange={(e)=>{setEmail(e.target.value)}}/>
      </div>
    </div>

    {/* Password */}
    <div className="flex flex-col gap-2">
        <label className="font-label-lg text-label-lg text-on-surface-variant">Password</label>
      
        <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-on-surface-variant" 
            style={{ fontVariationSettings: "'FILL' 0" }}>lock</span>

            <input className="w-full bg-surface-container-high border-none rounded-lg py-3 pl-10 pr-10 text-on-surface 
            font-body-md focus:ring-1 focus:ring-primary outline-none transition-shadow placeholder:text-on-surface-variant/50"
            id="password" placeholder="••••••••" required value={password} onChange={(e)=>{setPassword(e.target.value)}} type={visiblePassword?"text":"password"} name="password"/>
            
            <button className="absolute right-3 text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none"
            type="button" onClick={()=>{setVisiblePassword(prev=>prev?false:true)}}>
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0" }}>
                {visiblePassword ? "visibility":"visibility_off"}
                </span>
            </button>
        </div>
    </div>

    {/* Confirm Password */}

    {/* Remember Me */}
    <div className="flex items-center gap-3 mt-1">
        <input className="w-4 h-4 rounded bg-surface-container-high border-none text-primary focus:ring-primary
        focus:ring-offset-surface focus:ring-offset-0"  id="remember" type="checkbox"/>
        
        <label className="font-body-md text-body-md text-on-surface-variant select-none cursor-pointer">Remember me</label>
    </div>

    {/* Submit Button */}
    <button className="w-full bg-primary text-on-primary font-label-lg text-label-lg py-3 rounded-lg hover:bg-surface-tint 
    transition-colors active:scale-[0.98] mt-2" type="submit" >LogIn
    </button>

    <p className="text-center font-body-md text-body-md text-on-surface-variant mt-2">
        Don't have an account ?  
        <a className="text-primary hover:text-on-surface transition-colors font-medium" href="/register">  SignUp here</a>
    </p>
    
  </form>

    </>
  )
}

export default LoginForm;
