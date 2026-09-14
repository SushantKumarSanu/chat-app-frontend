import  {useState}  from "react";
import type { JSX } from "react";
import ProfileDetails from "../components/ProfileDetails/ProfileDetails.jsx";
import Avatar from "../components/Avatar/Avatar.jsx";

type ProfileView = null|"avatar";
type PRofileViewKey = Exclude<ProfileView,null>

function ProfilePanel(){
  const [profileView,setProfileView] = useState<ProfileView>(null);




  
  const profileViewMap:Record<PRofileViewKey,()=>JSX.Element>= {
    "avatar" : () => <Avatar selectPorfileView={setProfileView} profileView={profileView} />,

  }


    return <>
    <ProfileDetails  selectPorfileView={setProfileView}/>
    {profileView && profileViewMap[profileView]()}
    
    </>
};


export type {ProfileView};
export default ProfilePanel;