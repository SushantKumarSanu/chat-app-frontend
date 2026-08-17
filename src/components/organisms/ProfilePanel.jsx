import  {useEffect, useState}  from "react";
import ProfileDetails from "./ProfileDetails.jsx";
import AvatarOptionsDialog from "./AvatarOptionsDialog.jsx";
import AvatarUploadForm from "./AvatarUploadForm.jsx";
import Avatar from "./Avatar.jsx";

function ProfilePanel({ user , setUser }){
  const [profileView,setProfileView] = useState(null);

  const userAvatar = user?.avatar?.secure_url ;
  const userName =  user?.username;
  const userEmail = user?.email;
  const usersPrefix = userName.slice(0,2);

  useEffect(()=>{
    console.log(profileView);
  },[profileView]);
  
  
  const profileViewMap = {
    "avatar" : () => <Avatar user={user} setUser={setUser} selectPorfileView={setProfileView} profileView={profileView} />,

  }


    return <>
    <ProfileDetails  user={user} selectPorfileView={setProfileView}/>
    {profileViewMap[profileView]?.()}
    
    </>
};

export default ProfilePanel;