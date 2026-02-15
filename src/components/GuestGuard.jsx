import { Navigate } from "react-router-dom"

function GuestGuard({children,user}){
    if(user){
        return <Navigate to= "/chat" replace/>
    }
    return children;
}


export default GuestGuard ;