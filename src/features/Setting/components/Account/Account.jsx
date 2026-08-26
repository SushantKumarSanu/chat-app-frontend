import { useState } from "react";
import AccountDetails from "../Account/AccountDetails/AccountDetails.jsx";
import UpdatePassword from "./UpdatePassword/UpdatePassword.jsx";

function Account({ user , setSettingView}){

    const[accountView,setAccountView] = useState("details");

    const viewAccountMap = {
        "details": ()=><AccountDetails setSettingView={setSettingView} user={user} setAccountView={setAccountView}/>,
        "updatePassword":()=> <UpdatePassword setSettingView={setSettingView} setAccountView={setAccountView}/>
    };

    return <>{viewAccountMap[accountView]?.()}</>
};


export default Account