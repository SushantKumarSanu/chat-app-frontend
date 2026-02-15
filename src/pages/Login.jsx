import LoginForm from "../components/organisms/LoginForm.jsx"


function Login({setUser}){
    return(
        <div className="login-container">
            
            <LoginForm setUser={setUser}/>
            

        </div>
    )
}


export default Login;