import {Navigate} from "react-router-dom";

function AuthGuard({children,user}){
    if(!user){
        return <Navigate to ="/" replace />
    }
    return children
}
export default  AuthGuard;