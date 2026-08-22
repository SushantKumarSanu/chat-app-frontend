// import LoginForm from "../components/login/LoginForm.jsx"
import LoginForm from "../components/login/LoginForm"


function Login({setUser}){
    return(
        <div className="login-container">
            
            <LoginForm setUser={setUser}/>
            

        </div>
    )
}


export default Login;