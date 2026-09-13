import { useState } from "react";
import type { JSX } from "react";
import AccountDetails from "../Account/AccountDetails/AccountDetails.jsx";
import UpdatePassword from "./UpdatePassword/UpdatePassword.jsx";
import type { SettingView } from "../../pages/Setting.tsx";

interface prop{
    setSettingView:(view:SettingView)=>void
}

type AccountView = "details"|"updatePassword"


function Account({setSettingView}:prop){

    const[accountView,setAccountView] = useState<AccountView>("details");

    const viewAccountMap:Record<AccountView,()=>JSX.Element> = {
        "details": ()=><AccountDetails setAccountView={setAccountView}/>,
        "updatePassword":()=> <UpdatePassword setSettingView={setSettingView} setAccountView={setAccountView}/>
    };

    return <>{viewAccountMap[accountView]()}</>
};


export default Account;