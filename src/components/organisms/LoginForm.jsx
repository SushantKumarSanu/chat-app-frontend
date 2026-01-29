import { useState } from "react";

function LoginForm() {
    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

  return (

    <>
    <form className="login-form" onSubmit={function(e){
        e.preventDefault()
        setPassword("")
        setEmail("");
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
