import { useState } from "react";
import api from "../../services/api.js";

function LoginForm() {
    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

  return (

    <>
    <form className="login-form" onSubmit={async(e)=>{
        e.preventDefault();
        try{
            const res = await api.post("/api/auth/login",{
                email,
                password
            })
            localStorage.setItem("token",res.data.token);
            console.log("Login success:",res.data)
        }catch(error){
            console.error("Login failed:", error.response?.data || error.message)
        }
         setEmail("");
        setPassword("");
    }} >
        <h1>Login</h1>
        <input type="email" 
        placeholder="Email"
        value={email} onChange={(e)=>{
            setEmail(e.target.value);
        }} />
        <input type="password"
        placeholder="Password"
        value={password} onChange={(e)=>{
            setPassword(e.target.value)
        }} />
        <div className="checkbox-container">
            <input type="checkbox" id="rememberme" className="checkbox" />
            <label htmlFor="rememberme">Remember Me</label>
        </div>
        <button type="submit" >Submit</button>
    </form>
    </>
  )
}

export default LoginForm;
