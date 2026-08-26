import IntroAnimation from "../components/SignUp/IntroAnimation.jsx";
import "../components/SignUp/signUp.css"
import SignUpForm from "../components/SignUp/SignUpForm.jsx";
import SocialLogin from "../components/SignUp/SocialLogin.jsx";
import SignUpFooter from "../components/SignUp/SighUpFooter.jsx";

function SignUp({setUser}){

    return<><div className="signup-page">
        <IntroAnimation/>
        <div className="glass-card w-full max-w-md rounded-xl p-8 shadow-2xl flex flex-col gap-6 relative z-10">
        <SignUpForm setUser={setUser}/>
        <SocialLogin/>
        <SignUpFooter/>
        </div>
    </div>

    </>
}
export default SignUp;