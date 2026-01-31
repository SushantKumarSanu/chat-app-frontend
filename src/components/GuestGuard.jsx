import { Navigate } from "react-router-dom"

function GuestGuard({children}){
    const token = localStorage.getItem("token")
    if(token){
        return <Navigate to= "/chat" replace/>
    }
    return children;
}


export default GuestGuard ;