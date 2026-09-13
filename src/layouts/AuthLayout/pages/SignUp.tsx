import IntroAnimation from "../components/IntroAnimation.jsx";
import "../components/auth.css"
import SignUpForm from "../components/SignUp/SignUpForm.jsx";
import SocialLogin from "../components/SignUp/SocialLogin.jsx";
import SignUpFooter from "../components/SignUp/SighUpFooter.jsx";

function SignUp(){

    return<><div className="signup-page">
        <IntroAnimation/>
        <div className="glass-card w-full max-w-md rounded-xl p-8 shadow-2xl flex flex-col gap-6 relative z-10">
        <SignUpForm />
        <SocialLogin/>
        <SignUpFooter/>
        </div>
    </div>

    </>
}
export default SignUp;