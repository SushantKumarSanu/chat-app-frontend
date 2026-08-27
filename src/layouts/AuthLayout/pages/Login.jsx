
import IntroAnimation from "../components/IntroAnimation";
import LoginForm from "../components/Login/LoginForm";
import "../components/auth.css"

function Login({setUser}){
    return(
        <div className="signup-page">
            <IntroAnimation/>
            <div className="glass-card w-full max-w-md rounded-xl p-8 shadow-2xl flex flex-col gap-6 relative z-10">

                <LoginForm setUser={setUser}/>
            </div>
            

        </div>
    )
}


export default Login;